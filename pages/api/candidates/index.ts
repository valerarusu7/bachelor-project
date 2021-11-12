import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../utils/mongodb";
import Candidate from "../../../models/Candidate";
import { ICandidateDocument } from "../../../types";
import HandleError from "../../../helpers/ErrorHandler";

/**
 * @swagger
 * /api/candidates:
 *   post:
 *     description: Create a new candidate
 *     parameters:
 *      - in: body
 *        description: Candidate object to be created
 *        required: true
 *     responses:
 *        201:
 *          description: Candidate successfully created
 *        400:
 *          description: Bad request
 *        409:
 *          description: Duplicated field
 *        500:
 *          description: Internal error
 */

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();

  if (req.method === "POST") {
    try {
      const body = req.body;
      let candidate: ICandidateDocument;
      if (body.constructor !== Object) {
        candidate = new Candidate(JSON.parse(body));
      } else {
        candidate = new Candidate(body);
      }

      const savedCandidate = await candidate.save();

      return res
        .status(201)
        .json({ templateId: savedCandidate._id.toString() });
    } catch (error) {
      const result = HandleError(error as Error);
      return res.status(result.code).json({ error: result.error });
    }
  }
};
