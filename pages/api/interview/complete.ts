import { NextApiRequest, NextApiResponse } from "next";
import handleError from "../../../helpers/errorHandler";
import Candidate from "../../../models/Candidate";
import convertToTimeSpan from "../../../helpers/timeFormatter";
import withInterviewProtect from "../../../middleware/withInterviewProtect";
import withBodyConverter from "../../../middleware/withBodyConverter";
import Template from "../../../models/Template";
import {
  ICandidateAnswerDocument,
  ITaskDocument,
  TaskTypes,
} from "../../../types";

/**
 * @swagger
 * /api/templates:
 *   post:
 *     description: Create a new template
 */

function calculateScore(
  tasks: ITaskDocument[],
  answers: ICandidateAnswerDocument[]
) {
  let multipleTasksCount = 0;

  const points = tasks.map((task, i) => {
    if (
      (task.taskType === TaskTypes.Email && task.choices.length !== 0) ||
      task.taskType === TaskTypes.Multiple
    ) {
      multipleTasksCount++;
      if (!answers[i]) {
        return 0;
      } else {
        const result = task.choices.reduce(
          (total, choice) => {
            if (choice.isCorrect && answers[i].choices.includes(choice._id)) {
              total[0]++;
              total[1]++;
              return total;
            } else if (
              !choice.isCorrect &&
              answers[i].choices.includes(choice._id)
            ) {
              total[1]++;
              return total;
            } else if (
              choice.isCorrect &&
              !answers[i].choices.includes(choice._id)
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

  return Math.round(
    (points?.reduce((total, val) => total + val) / multipleTasksCount) * 100
  );
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
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
      })
        .select("interviews")
        .lean()
        .orFail();

      const interview = candidate.interviews.find(
        (interview) => interview._id.toString() === interviewId
      );

      const template = await Template.findOne({
        jobId: interview?.jobId,
      })
        .select("tasks")
        .lean()
        .orFail();

      let score = calculateScore(
        template.tasks as ITaskDocument[],
        interview?.answers as ICandidateAnswerDocument[]
      );

      let time = convertToTimeSpan(started, new Date().toISOString());

      await Candidate.findOneAndUpdate(
        { "interviews._id": interviewId },
        {
          "interviews.$.startedUtc": started,
          "interviews.$.completedUtc": new Date(),
          "interviews.$.time": time,
          "interviews.$.completed": true,
          "interviews.$.score": score,
        }
      );
      return res
        .status(201)
        .json({ success: "Interview successfully completed." });
    } catch (error) {
      const result = handleError(error as Error);
      return res.status(result.code).json({ error: result.error });
    }
  }

  return res.status(405).json({ error: "Only POST requests are allowed." });
};

export default withInterviewProtect(withBodyConverter(handler));
