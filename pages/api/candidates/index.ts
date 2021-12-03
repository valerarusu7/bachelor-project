import { NextApiRequest, NextApiResponse } from "next";
import Candidate from "../../../models/Candidate";
import {
  ICandidateDocument,
  ICandidateInterviewDocument,
} from "../../../types";
import handleError from "../../../helpers/errorHandler";
import withProtect from "../../../middleware/withProtect";

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
  const body = req.body;

  if (req.method === "POST") {
    try {
      let candidate: ICandidateDocument;
      if (body.constructor !== Object) {
        candidate = new Candidate(JSON.parse(body));
      } else {
        candidate = new Candidate(body);
      }

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
};

export default withProtect(handler, ["manager", "admin"]);
