import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../utils/mongodb";
import JobPosition from "../../../models/JobPosition";

/**
 * @swagger
 * /api/positions:
 *   get:
 *     description: Returns the all positions
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: UUID string of the position to get information
 */

connectDB();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const jobPositions = await JobPosition.find().lean();

      return res.status(200).json(jobPositions);
    } catch (error) {
      return res.status(404).json({ success: false, error: error });
    }
  }
};
