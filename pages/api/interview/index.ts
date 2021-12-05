import { NextApiRequest, NextApiResponse } from "next";
import handleError from "../../../helpers/errorHandler";
import Candidate from "../../../models/Candidate";
import convertToTimeSpan from "../../../helpers/timeFormatter";
import withInterviewProtect from "../../../middleware/withInterviewProtect";
import withBodyConverter from "../../../middleware/withBodyConverter";
import Template from "../../../models/Template";
import { TaskTypes } from "../../../types";

/**
 * @swagger
 * /api/templates:
 *   post:
 *     description: Create a new template
 */

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const body = req.body;
    //@ts-ignore
    const interviewId = req.interviewId;

    try {
      // let time = convertToTimeSpan(body.startedUtc, body.completedUtc);
      const candidate = await Candidate.findOne({
        "interviews._id": interviewId,
      })
        .select("interviews")
        .lean()
        .orFail();

      const interview = candidate.interviews.find(
        (interview) => interview._id.toString() === interviewId
      );

      const template = await Template.findOne({ jobId: interview?.jobId })
        .select("tasks")
        .lean()
        .orFail();

      const tasks = template.tasks;

      let multipleTasksCount = 0;

      const points = tasks.map((task, i) => {
        if (
          (task.taskType === TaskTypes.Email && task.choices.length !== 0) ||
          task.taskType === TaskTypes.Multiple
        ) {
          multipleTasksCount++;
          if (!interview?.answers[i]) {
            return 0;
          } else {
            const result = task.choices.reduce(
              (total, choice) => {
                if (
                  choice.isCorrect &&
                  interview?.answers[i].choices.includes(choice._id)
                ) {
                  total[0]++;
                  total[1]++;
                  return total;
                } else if (
                  !choice.isCorrect &&
                  interview?.answers[i].choices.includes(choice._id)
                ) {
                  total[1]++;
                  return total;
                } else {
                  return total;
                }
              },
              [0, 0]
            );

            return result[0] / result[1];
          }
        }
        return 0;
      });

      const score =
        (points?.reduce((total, val) => total + val) / multipleTasksCount) *
        100;

      let time = convertToTimeSpan(body.startedUtc, body.completedUtc);

      await Candidate.findOneAndUpdate(
        { "interviews._id": interviewId },
        {
          "interviews.$.startedUtc": body.startedUtc,
          "interviews.$.completedUtc": body.completedUtc,
          "interviews.$.time": time,
          "interviews.$.completed": true,
          "interviews.$.score": score,
        }
      );
      return res
        .status(200)
        .json({ success: "Interview successfully created." });
    } catch (error) {
      const result = handleError(error as Error);
      return res.status(result.code).json({ error: result.error });
    }
  }

  return res.status(405).json({ error: "Only POST requests are allowed." });
};

export default withInterviewProtect(withBodyConverter(handler));
