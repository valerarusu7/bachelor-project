import Template from "../../../models/Template";
import { NextApiRequest, NextApiResponse } from "next";
import handleError from "../../../helpers/errorHandler";
import Candidate from "../../../models/Candidate";
import { TaskTypes } from "../../../types";
import withInterviewProtection from "../../../middleware/interviewProtection";
import withValidation from "../../../middleware/validation";
import { taskSchema } from "../../../models/api/Interview";

/**
 * @swagger
 * /api/templates:
 *   post:
 *     description: Create a new template
 */

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { order } = req.query;
    //@ts-ignore
    const interviewId = req.interviewId;
    //@ts-ignore
    const started = req.started;

    if (!started) {
      return res.status(400).json({ error: "Interview has not started yet." });
    }

    try {
      const candidate = await Candidate.findOne({
        "interviews._id": interviewId,
      }).orFail();

      const foundInterview = candidate.interviews.find(
        (interview) => interview._id.toString() === interviewId
      );
      if (!foundInterview) {
        return res.status(404).json({ error: "No template found." });
      }

      const template = await Template.findOne({
        jobId: foundInterview.jobId,
      })
        .lean()
        .orFail();

      const answer = req.body;
      const task = template.tasks.find(
        (task) => task.order === parseInt(order as string)
      );
      if (!task) {
        return res.status(404).json({ error: "No task found." });
      }

      if (
        (task.taskType === TaskTypes.Single ||
          (task.taskType === TaskTypes.Email && !task.choices)) &&
        typeof answer.answer !== "string"
      ) {
        return res.status(400).json({ error: "Incorrect answer." });
      } else if (
        (task.taskType === TaskTypes.Multiple ||
          (task.taskType === TaskTypes.Email && task.choices)) &&
        !Array.isArray(answer.answer)
      ) {
        return res.status(400).json({ error: "Incorrect answer." });
      }

      if (Array.isArray(answer.answer)) {
        answer.choices = answer.answer;
        delete answer.answer;
      }

      answer.taskId = task._id;
      foundInterview.answers[parseInt(order as string)] = answer;

      await candidate.save();

      var nextTask = template.tasks.find(
        (task) => task.order == parseInt(order as string) + 1
      );

      if (!nextTask) {
        return res.status(201).json({ finished: true });
      }

      nextTask?.choices.forEach((choice) => {
        // @ts-ignore
        delete choice.isCorrect;
      });

      return res.status(201).json(nextTask);
    } catch (error) {
      const result = handleError(error as Error);
      return res.status(result.code).json({ error: result.error });
    }
  }

  return res.status(405).json({ error: "Only POST requests are allowed." });
};

export default withValidation(taskSchema, withInterviewProtection(handler));
