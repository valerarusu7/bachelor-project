import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../middleware/mongodb";
import JobPosition from "../../../models/JobPosition";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const jobPositions = await JobPosition.find().lean();

      return res.status(200).json(jobPositions);
    } catch (error) {
      return res.status(404).json({ success: false, error: error });
    }
  }
};

export default connectDB(handler);
