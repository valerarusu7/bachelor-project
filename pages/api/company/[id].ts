import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../middleware/mongodb";
import Company from "../../../models/Company";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const id: string = req.query.id as string;

  if (req.method === "GET") {
    try {
      const company = await Company.findById(id).lean();
      if (company == null) {
        return res.status(404).json({
          success: false,
          error: "No company with specified id found.",
        });
      }

      return res.status(200).json(company);
    } catch (error) {
      return res.status(404).json({ success: false, error: error });
    }
  }
};

export default connectDB(handler);