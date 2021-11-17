import { NextApiRequest, NextApiResponse } from "next";
import handleError from "../../../helpers/errorHandler";
import sendEmail from "../../../helpers/mailer";
import jwt from "jsonwebtoken";
import Candidate from "../../../models/Candidate";
import { ICandidateInterviewDocument, IInterviewToken } from "../../../types";
import connectDB from "../../../utils/mongodb";
import absoluteUrl from "next-absolute-url";

const { JWT_INTERVIEW_PRIVATE_KEY } = process.env;

/**
 * @swagger
 * /api/templates:
 *   post:
 *     description: Create a new template
 */

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();
  const { id } = req.query;

  if (req.method === "POST") {
    try {
      await Candidate.findOne({ "interviews._id": id }).exec(async function (
        err,
        candidate
      ) {
        var foundInterview = candidate.interviews.find(
          (interview: ICandidateInterviewDocument) => interview._id == id
        );
        if (foundInterview == undefined) {
          return res.status(404).json({ error: "No template found." });
        }
        const token = jwt.sign(
          { interviewId: foundInterview._id } as IInterviewToken,
          JWT_INTERVIEW_PRIVATE_KEY as string,
          { expiresIn: "7d" as string }
        );
        var { origin } = absoluteUrl(req);
        var url = `${origin}/interview/${token}`;
        await sendEmail(candidate.companyId.name, candidate.email, url);
      });
      return res.status(201).json({ success: true });
    } catch (error) {
      const result = handleError(error as Error);
      return res.status(result.code).json({ error: result.error });
    }
  }
};
