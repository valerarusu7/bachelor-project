import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../utils/mongodb";
import Company from "../../../models/Company";
import { IUserDocument, ICompanyDocument } from "../../../types";
import handleError from "../../../helpers/errorHandler";
import User from "../../../models/User";

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

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();
  const body = req.body;

  if (req.method === "POST") {
    try {
      let company: ICompanyDocument;
      let user: IUserDocument;
      if (body.constructor !== Object) {
        const bodyData = JSON.parse(body);
        company = new Company(bodyData.company);
        user = new User(bodyData.user);
      } else {
        company = new Company(body.company);
        user = new User(body.user);
      }
      user.companyId = company._id;
      user.role = "admin";

      await company.save();
      await user.save();

      return res.status(201).json({ success: true });
    } catch (error) {
      const result = handleError(error as Error);
      return res.status(result.code).json({ error: result.error });
    }
  }
};
