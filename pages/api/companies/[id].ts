import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../utils/mongodb";
import Company from "../../../models/Company";
import { ICompany, ICompanyDocument } from "../../../types";

/**
 * @swagger
 * /api/company/{id}:
 *   get:
 *     description: Returns the company information
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: UUID string of the company to get information
 */

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();
  const id: string = req.query.id as string;

  if (req.method === "PUT") {
    try {
      const companyData: ICompany = req.body;

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
      return res.status(404).json({ success: false, error: error });
    }
  }

  if (req.method === "POST") {
    try {
      const companyData: ICompany = req.body;

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
      return res.status(404).json({ success: false, error: error });
    }
  }
};
