import { NextApiRequest, NextApiResponse } from "next";
import handleError from "../../../helpers/errorHandler";
import connectDB from "../../../utils/mongodb";
import Candidate from "../../../models/Candidate";
import verifyAuthValue from "../../../helpers/tokenVerifier";
import Template from "../../../models/Template";

/**
 * @swagger
 * /api/templates:
 *   post:
 *     description: Create a new template
 */

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // const authValue = req.headers.authorization;
  const body = req.body;
  await connectDB();

  if (req.method === "GET") {
    try {
      // var interviewId = verifyAuthValue(authValue);

      var candidate = await Candidate.findOne({
        "interviews._id": body.interviewId,
      }).lean();

      if (!candidate) {
        return res.status(404).json({ error: "No interview found." });
      }

      var foundInterview = candidate.interviews.find(
        (interview) => interview._id == body.interviewId
      );

      if (!foundInterview) {
        return res.status(404).json({ error: "No interview found." });
      }

      const template = await Template.findOne(
        { jobId: foundInterview.jobId },
        {
          tasks: { $slice: 1 },
        }
      )
        .select("_id name description companyId")
        .populate("companyId")
        .lean();

      return res.status(200).json(template);
    } catch (error) {
      const result = handleError(error as Error);
      return res.status(result.code).json({ error: result.error });
    }
  }
};
