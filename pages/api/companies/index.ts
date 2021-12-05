import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../utils/mongodb";
import Company from "../../../models/Company";
import handleError from "../../../helpers/errorHandler";
import User from "../../../models/User";
import withBodyConverter from "../../../middleware/withBodyConverter";
import { Roles } from "../../../types";

/**
 * @swagger
 * /api/company/{id}:
 *   put:
 *     description: Returns the company information
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: UUID string of the company to get information
 *      - in: body
 */

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    await connectDB();
    const body = req.body;

    try {
      let company = new Company(body.company);
      let user = new User(body.user);

      user.companyId = company._id;
      user.role = Roles.Admin;

      await Promise.all([company.save(), user.save()]);

      return res.status(201).json({ success: true });
    } catch (error) {
      const result = handleError(error as Error);
      return res.status(result.code).json({ error: result.error });
    }
  }

  return res.status(405).json({ error: "Only POST requests are allowed." });
};

export default withBodyConverter(handler);
