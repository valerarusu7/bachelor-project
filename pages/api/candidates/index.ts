import { NextApiRequest, NextApiResponse } from "next";
import Candidate from "../../../models/Candidate";
import {
  ICandidateDocument,
  ICandidateInterviewDocument,
} from "../../../types";
import handleError from "../../../helpers/errorHandler";
import withProtect from "../../../middleware/withProtect";
import connectDB from "../../../utils/mongodb";
import withBodyConverter from "../../../middleware/withBodyConverter";

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

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    await connectDB();
    const body = req.body;

    try {
      let candidate = new Candidate(body);

      var foundCandidate: ICandidateDocument | null = await Candidate.findOne({
        email: body.email,
      });

      if (!foundCandidate) {
        await candidate.save();
      } else {
        body.interviews.forEach((interview: ICandidateInterviewDocument) => {
          if (
            !(foundCandidate as ICandidateDocument).interviews
              .map((interview: ICandidateInterviewDocument) => interview.jobId)
              .includes(interview.jobId)
          ) {
            (foundCandidate as ICandidateDocument).interviews.push(interview);
          }
        });

        await foundCandidate.save();
      }

      return res.status(201).json({ success: "Candidate successfully added." });
    } catch (error) {
      const result = handleError(error as Error);
      return res.status(result.code).json({ error: result.error });
    }
  }

  return res.status(405).json({ error: "Only POST requests are allowed." });
};

export default withBodyConverter(handler);
