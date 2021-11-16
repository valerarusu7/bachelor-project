import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../utils/mongodb";
import Template from "../../../models/Template";
import Candidate from "../../../models/Candidate";
import { ICandidateInterviewDocument, ITaskDocument } from "../../../types";
import HandleError from "../../../helpers/ErrorHandler";
import convertToTimeSpan from "../../../helpers/timeFormatter";

/**
 * @swagger
 * /api/candidates:
 *   post:
 *     description: Create a new candidate
 *     parameters:
 *      - in: body
 *        description: Candidate object to be created
 *        required: true
 *     responses:
 *        201:
 *          description: Candidate successfully created
 *        400:
 *          description: Bad request
 *        409:
 *          description: Duplicated field
 *        500:
 *          description: Internal error
 */

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();
  const { id, order } = req.query;

  if (req.method === "GET") {
    try {
      await Candidate.findOne({ "interviews._id": id }).exec(async function (
        err,
        candidate
      ) {
        var foundInterview = candidate.interviews.find(
          (interview: ICandidateInterviewDocument) => interview._id == id
        );
        await Template.findOne({ jobId: foundInterview.jobId }).exec(function (
          err,
          template
        ) {
          var task = template.tasks.find(
            (item: ITaskDocument) => item.order == parseInt(order as string) + 1
          );
          return res.status(200).json(task);
        });
      });
    } catch (error) {
      const result = HandleError(error as Error);
      return res.status(result.code).json({ error: result.error });
    }
  }

  if (req.method === "POST") {
    try {
      const body = req.body;
      let time = convertToTimeSpan(body.startedUtc, body.completedUtc);
      let candidate = await Candidate.findOneAndUpdate(
        { "interviews._id": id },
        {
          "interviews.$.startedUtc": body.startedUtc,
          "interviews.$.completedUtc": body.completedUtc,
          "interviews.$.time": time,
          "interviews.$.answers": body.answers,
        }
      );
      return res.status(200).json(candidate._id);
    } catch (error) {
      const result = HandleError(error as Error);
      return res.status(result.code).json({ error: result.error });
    }
  }
};
