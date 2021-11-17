import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../utils/mongodb";
import Company from "../../../models/Company";
import { ICompany, ICompanyDocument } from "../../../types";
import handleError from "../../../helpers/errorHandler";

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
  const { id } = req.query;
  const companyData: ICompany = req.body;

  if (req.method === "PUT") {
    try {
      const company: ICompanyDocument = await Company.findByIdAndUpdate(
        id,
        companyData,
        {
          new: true,
        }
      );

      return res.status(200).json({
        success: true,
        company,
      });
    } catch (error) {
      const result = handleError(error as Error);
      return res.status(result.code).json({ error: result.error });
    }
  }

  if (req.method === "POST") {
    try {
      const company: ICompanyDocument = await Company.findByIdAndUpdate(
        id,
        companyData,
        {
          new: true,
        }
      );

      return res.status(200).json({
        success: true,
        company,
      });
    } catch (error) {
      const result = handleError(error as Error);
      return res.status(result.code).json({ error: result.error });
    }
  }
};
