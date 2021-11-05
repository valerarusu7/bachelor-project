import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../middleware/mongodb";
import JobPosition from "../../../models/JobPosition";

/**
 * @swagger
 * /api/positions/{id}:
 *   get:
 *     description: Returns the position information details
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: UUID string of the position to get information
 */

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const id: string = req.query.id as string;

  if (req.method === "GET") {
    try {
      const jobPosition = await JobPosition.findById(id).lean();
      if (jobPosition == null) {
        return res.status(404).json({
          success: false,
          error: "No job position with specified id found.",
        });
      }

      return res.status(200).json(jobPosition);
    } catch (error) {
      return res.status(404).json({ success: false, error: error });
    }
  }
};

export default connectDB(handler);
