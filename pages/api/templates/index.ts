import { NextApiRequest, NextApiResponse } from "next";
import handleError from "../../../helpers/errorHandler";
import Template from "../../../models/Template";
import { ITemplateDocument, ICandidateInterviewDocument } from "../../../types";
import connectDB from "../../../utils/mongodb";
import Candidate from "../../../models/Candidate";
import verifyAuthValue from "../../../helpers/tokenVerifier";

/**
 * @swagger
 * /api/templates:
 *   post:
 *     description: Create a new template
 */

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const authValue = req.headers.authorization;
  await connectDB();

  if (req.method === "POST") {
    try {
      const body = req.body;
      let template: ITemplateDocument;
      if (body.constructor !== Object) {
        template = new Template(JSON.parse(body));
      } else {
        template = new Template(body);
      }

      const savedTemplate = await template.save();

      return res.status(201).json({ templateId: savedTemplate._id.toString() });
    } catch (error) {
      const result = handleError(error as Error);
      return res.status(result.code).json({ error: result.error });
    }
  }

  if (req.method === "GET") {
    try {
      var interviewId = verifyAuthValue(authValue);
      var candidate = await Candidate.findOne({
        "interviews._id": interviewId,
      }).lean();
      var foundInterview = candidate.interviews.find(
        (interview: ICandidateInterviewDocument) => interview._id == interviewId
      );

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
