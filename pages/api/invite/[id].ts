import { NextApiRequest, NextApiResponse } from "next";
import handleError from "../../../helpers/errorHandler";
import sendEmail from "../../../helpers/mailer";
import jwt from "jsonwebtoken";
import Candidate from "../../../models/Candidate";
import absoluteUrl from "next-absolute-url";
import withProtect from "../../../middleware/withProtect";
import Template from "../../../models/Template";
import { ITemplate } from "../../../types";
import connectDB from "../../../utils/mongodb";

const { INTERVIEW_PRIVATE_KEY } = process.env;

/**
 * @swagger
 * /api/templates:
 *   post:
 *     description: Create a new template
 */

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  await connectDB();

  if (req.method === "POST") {
    try {
      const body = req.body;

      let data;
      if (body.constructor !== Object) {
        data = JSON.parse(body);
      } else {
        data = body;
      }

      if (!data.emails) {
        return res.status(404).json({ error: "No emails provided." });
      }

      await Promise.all(
        data.emails.map(async (email: string) => {
          let template = await Template.findById(id).select("jobId").lean();
          if (!template) {
            return res.status(404).json({ error: "Cannot find template." });
          }

          let candidate = await Candidate.findOne({
            email: email,
            "interviews.jobId": template.jobId,
          })
            .select("interviews companyId")
            .populate("companyId interviews.jobId")
            .lean();

          if (!candidate) {
            return res.status(404).json({ error: "Cannot find candidate." });
          }

          let foundInterview = candidate.interviews.find(
            // @ts-ignore
            (interview) => interview.jobId._id === template.jobId
          );
          if (!foundInterview) {
            return res.status(404).json({ error: "No interview found." });
          }

          const token = jwt.sign(
            { interviewId: foundInterview._id as string },
            INTERVIEW_PRIVATE_KEY as string,
            { expiresIn: "7d" as string }
          );

          var { origin } = absoluteUrl(req);
          var url = `${origin}/interview/${token}`;

          await sendEmail(
            // @ts-ignore
            candidate.companyId.name,
            // @ts-ignore
            foundInterview.jobId.name,
            email,
            url
          );
        })
      );

      return res.status(200).json({ success: true });
    } catch (error) {
      const result = handleError(error as Error);
      return res.status(result.code).json({ error: result.error });
    }
  }
};
