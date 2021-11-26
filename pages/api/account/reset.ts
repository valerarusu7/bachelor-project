import { NextApiRequest, NextApiResponse } from "next";
import handleError from "../../../helpers/errorHandler";
import sendEmail from "../../../helpers/mailer";
import jwt from "jsonwebtoken";
import absoluteUrl from "next-absolute-url";
import User from "../../../models/User";

const { ACCOUNT_RESET_PRIVATE_KEY } = process.env;

/**
 * @swagger
 * /api/templates:
 *   post:
 *     description: Create a new template
 */

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests are allowed." });
  }
  const { email } = req.query;
  try {
    if (!email) {
      return res.status(400).json({ error: "Email needs to be provided." });
    }

    const user = await User.findOne({ email: email })
      .populate("companyId")
      .lean();
    const token = jwt.sign(
      { email: email },
      ACCOUNT_RESET_PRIVATE_KEY as string,
      { expiresIn: "1h" as string }
    );
    var { origin } = absoluteUrl(req);
    var url = `${origin}/auth/reset/${token}`;

    await sendEmail(user.companyId.name, email as string, url);

    return res.status(201).json({ success: true });
  } catch (error) {
    const result = handleError(error as Error);
    return res.status(result.code).json({ error: result.error });
  }
};
