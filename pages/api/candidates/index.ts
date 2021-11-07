import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../middleware/mongodb";
import Candidate from "../../../models/Candidate";
import { ICandidate } from "../../../types";

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

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const candidates = await Candidate.find().lean();

      return res.status(200).json(candidates);
    } catch (error) {
      return res.status(404).json({ success: false, error: error });
    }
  }

  if (req.method === "POST") {
    try {
      const body: ICandidate = req.body;
      const candidate = await Candidate.create(body);

      return res.status(201).json(candidate._id);
    } catch (error) {
      return res.status(404).json({ success: false, error: error });
    }
  }
};

export default connectDB(handler);
