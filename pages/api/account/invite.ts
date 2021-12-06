import { NextApiRequest, NextApiResponse } from "next";
import handleError from "../../../helpers/errorHandler";
import { sendRegistrationEmail } from "../../../helpers/mailer";
import jwt from "jsonwebtoken";
import absoluteUrl from "next-absolute-url";
import withProtect from "../../../middleware/withProtect";
import withBodyConverter from "../../../middleware/withBodyConverter";
import { Roles } from "../../../types";
import Company from "../../../models/Company";

const { ACCOUNT_PRIVATE_KEY } = process.env;

/**
 * @swagger
 * /api/templates:
 *   post:
 *     description: Create a new template
 */

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const body = req.body;
    // @ts-ignore
    const companyId: string = req.companyId;
    // @ts-ignore
    const user: IUser = req.user;

    if (!body.emails || body.emails.length === 0) {
      return res
        .status(400)
        .json({ error: "At least one email needs to be provided" });
    }
    try {
      const company = await Company.findById(companyId).select("name").lean();

      await Promise.all(
        body.emails.map(async (email: string) => {
          const token = jwt.sign(
            // @ts-ignore
            { email: email, companyId: companyId, companyName: company.name },
            ACCOUNT_PRIVATE_KEY as string,
            { expiresIn: "1d" as string }
          );
          var { origin } = absoluteUrl(req);
          var url = `${origin}/auth/register/${token}`;

          await sendRegistrationEmail(
            company.name,
            user.firstName + " " + user.lastName,
            email,
            url
          );
        })
      );

      return res.status(201).json({ success: true });
    } catch (error) {
      const result = handleError(error as Error);
      return res.status(result.code).json({ error: result.error });
    }
  }

  return res.status(405).json({ error: "Only POST requests are allowed." });
};

export default withProtect(withBodyConverter(handler), [Roles.Admin]);
