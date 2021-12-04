import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../utils/mongodb";
import Template from "../../../models/Template";
import Candidate from "../../../models/Candidate";
import {
  ICandidateInterviewDocument,
  ITaskDocument,
  ICandidateDocument,
  ITemplateDocument,
} from "../../../types";
import handleError from "../../../helpers/errorHandler";
import convertToTimeSpan from "../../../helpers/timeFormatter";
import verifyAuthValue from "../../../helpers/tokenVerifier";

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
  // const authValue = req.headers.authorization;
  const { order } = req.query;
  const body = req.body;
  const { id } = req.query;
  await connectDB();

  if (req.method === "GET") {
    try {
      // var interviewId = verifyAuthValue(authValue);
      await Candidate.findOne({ "interviews._id": id }).exec(async function (
        err,
        candidate
      ) {
        if (err) {
          return res
            .status(404)
            .json({ error: "No Candidate with the interview id." });
        }

        var foundInterview = (candidate as ICandidateDocument).interviews.find(
          (interview: ICandidateInterviewDocument) => interview._id === id
        );
        if (!foundInterview) {
          return res.status(404).json({ error: "No template found." });
        }

        await Template.findOne({ jobId: foundInterview.jobId }).exec(function (
          err,
          template
        ) {
          if (err) {
            return res.status(404).json({ error: "No template found." });
          }
          var task = (template as ITemplateDocument).tasks.find(
            (item: ITaskDocument) => item.order == parseInt(order as string) + 1
          );
          return res.status(200).json(task);
        });
      });
    } catch (error) {
      const result = handleError(error as Error);
      return res.status(result.code).json({ error: result.error });
    }
  }

  if (req.method === "POST") {
    try {
      // var interviewId = verifyAuthValue(authValue);
      let time = convertToTimeSpan(body.startedUtc, body.completedUtc);
      await Candidate.findOneAndUpdate(
        { "interviews._id": id },
        {
          "interviews.$.startedUtc": body.startedUtc,
          "interviews.$.completedUtc": body.completedUtc,
          "interviews.$.time": time,
          "interviews.$.answers": body.answers,
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
};