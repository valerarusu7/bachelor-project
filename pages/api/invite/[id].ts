import { NextApiRequest, NextApiResponse } from "next";
import handleError from "../../../helpers/errorHandler";
import sendEmail from "../../../helpers/mailer";
import jwt from "jsonwebtoken";
import Candidate from "../../../models/Candidate";
import absoluteUrl from "next-absolute-url";
import withProtect from "../../../middleware/withProtect";

const { INTERVIEW_PRIVATE_KEY } = process.env;

/**
 * @swagger
 * /api/templates:
 *   post:
 *     description: Create a new template
 */

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (req.method === "POST") {
    try {
      let candidate = await Candidate.findOne({ "interviews._id": id })
        .populate("companyId")
        .lean();

      if (!candidate) {
        return res.status(404).json({ error: "Cannot find candidate." });
      }

      let foundInterview = candidate.interviews.find(
        (interview) => interview._id === id
      );
      if (!foundInterview) {
        return res.status(404).json({ error: "No template found." });
      }

      const token = jwt.sign(
        { interviewId: foundInterview._id as string },
        INTERVIEW_PRIVATE_KEY as string,
        { expiresIn: "7d" as string }
      );

      var { origin } = absoluteUrl(req);
      var url = `${origin}/interview/${token}`;
      // @ts-ignore
      await sendEmail(candidate.companyId.name, candidate.email, url);

      return res.status(201).json({ success: true });
    } catch (error) {
      const result = handleError(error as Error);
      return res.status(result.code).json({ error: result.error });
    }
  }
};

export default withProtect(handler, ["manager", "admin"]);
