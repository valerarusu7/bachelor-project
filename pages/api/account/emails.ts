import handleError from "../../../helpers/errorHandler";
import { sendRegistrationEmail } from "../../../helpers/mailer";
import jwt from "jsonwebtoken";
import absoluteUrl from "next-absolute-url";
import withProtection from "../../../middleware/protection";
import { Roles } from "../../../types";
import Company from "../../../models/Company";
import { emailsSchema } from "../../../models/api/Email";
import withValidation from "../../../middleware/validation";
import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";

const { ACCOUNT_PRIVATE_KEY } = process.env;

export default nextConnect()
  .use(withValidation(emailsSchema))
  .use(withProtection([Roles.Admin]))
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    const body = req.body;
    // @ts-ignore
    const companyId: string = req.companyId;
    // @ts-ignore
    const name: string = req.name;

    try {
      const company = await Company.findById(companyId).select("name").lean();

      await Promise.all(
        body.emails.map(async (email: string) => {
          const token = jwt.sign(
            { email: email, companyId: companyId, companyName: company.name },
            ACCOUNT_PRIVATE_KEY as string,
            { expiresIn: "1d" as string }
          );

          var { origin } = absoluteUrl(req);
          var url = `${origin}/auth/register/${token}`;

          await sendRegistrationEmail(company.name, name, email, url);
        })
      );

      return res
        .status(201)
        .json({ success: "Registration emails successfully sent." });
    } catch (error) {
      const result = handleError(error as Error);
      return res.status(result.code).json({ error: result.error });
    }
  });
