import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../utils/mongodb";
import Candidate from "../../../models/Candidate";
import {
  ICandidateDocument,
  ICandidateInterviewDocument,
} from "../../../types";
import handleError from "../../../helpers/errorHandler";

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
  const body = req.body;
  await connectDB();

  if (req.method === "POST") {
    try {
      let candidate: ICandidateDocument;
      if (body.constructor !== Object) {
        candidate = new Candidate(JSON.parse(body));
      } else {
        candidate = new Candidate(body);
      }

      Candidate.countDocuments(
        { email: body.email },
        async function (err, count) {
          if (count === 1) {
            var updatedCandidate = await Candidate.findOne({
              email: body.email,
            });
            body.interviews.forEach(
              (interview: ICandidateInterviewDocument) => {
                if (
                  !updatedCandidate.interviews
                    .map(
                      (interview: ICandidateInterviewDocument) =>
                        interview.jobId
                    )
                    .includes(interview.jobId)
                ) {
                  updatedCandidate.interviews.push(interview);
                }
              }
            );
            updatedCandidate.save();
            return res
              .status(201)
              .json({ templateId: updatedCandidate._id.toString() });
          } else {
            const savedCandidate = await candidate.save();
            return res
              .status(201)
              .json({ templateId: savedCandidate._id.toString() });
          }
        }
      );
    } catch (error) {
      const result = handleError(error as Error);
      return res.status(result.code).json({ error: result.error });
    }
  }
};
