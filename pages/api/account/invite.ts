import { NextApiRequest, NextApiResponse } from "next";
import handleError from "../../../helpers/errorHandler";
import sendEmail from "../../../helpers/mailer";
import jwt from "jsonwebtoken";
import absoluteUrl from "next-absolute-url";
import { IUserTokenPayload } from "../../../types";
import Company from "../../../models/Company";

const { ACCOUNT_ACCESS_PRIVATE_KEY, ACCOUNT_PRIVATE_KEY } = process.env;

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
  const body = req.body;
  const authValue = req.headers.authorization;
  try {
    if (!body.emails || !body.emails.length || body.emails.length === 0) {
      return res
        .status(400)
        .json({ error: "At least one email needs to be provided" });
    }

    if (authValue === undefined) {
      throw new Error("No authentication provided.");
    }
    const token = authValue.replace("Bearer ", "");
    var decodedToken = jwt.verify(token, ACCOUNT_ACCESS_PRIVATE_KEY as string);

    const { companyId } = decodedToken as IUserTokenPayload;
    const company = await Company.findById(companyId).select("name").lean();

    body.emails.forEach(async (email: string) => {
      const token = jwt.sign(
        { email: email, companyId: body.companyId },
        ACCOUNT_PRIVATE_KEY as string,
        { expiresIn: "7d" as string }
      );
      var { origin } = absoluteUrl(req);
      var url = `${origin}/auth/${token}`;

      await sendEmail(company.name, email, url);
    });

    return res.status(201).json({ success: true });
  } catch (error) {
    const result = handleError(error as Error);
    return res.status(result.code).json({ error: result.error });
  }
};
