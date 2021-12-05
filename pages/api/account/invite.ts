import { NextApiRequest, NextApiResponse } from "next";
import handleError from "../../../helpers/errorHandler";
import sendEmail from "../../../helpers/mailer";
import jwt from "jsonwebtoken";
import absoluteUrl from "next-absolute-url";
import Company from "../../../models/Company";
import withProtect from "../../../middleware/withProtect";
import withBodyConverter from "../../../middleware/withBodyConverter";
import { Roles } from "../../../types";

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

    if (!body.emails || !body.emails.length || body.emails.length === 0) {
      return res
        .status(400)
        .json({ error: "At least one email needs to be provided" });
    }
    try {
      // @ts-ignore
      const company = await Company.findById(req.companyId)
        .select("name")
        .lean();

      body.emails.forEach(async (email: string) => {
        const token = jwt.sign(
          // @ts-ignore
          { email: email, companyId: req.companyId },
          ACCOUNT_PRIVATE_KEY as string,
          { expiresIn: "7d" as string }
        );
        var { origin } = absoluteUrl(req);
        var url = `${origin}/auth/${token}`;

        // await sendEmail(company.name, email, url);
      });

      return res.status(201).json({ success: true });
    } catch (error) {
      const result = handleError(error as Error);
      return res.status(result.code).json({ error: result.error });
    }
  }

  return res.status(405).json({ error: "Only POST requests are allowed." });
};

export default withProtect(withBodyConverter(handler), [Roles.Admin]);
