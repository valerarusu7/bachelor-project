import { NextApiRequest, NextApiResponse } from "next";
import Candidate from "../../../models/Candidate";
import {
  ICandidateDocument,
  ICandidateInterviewDocument,
} from "../../../types";
import handleError from "../../../helpers/errorHandler";
import connectDB from "../../../utils/mongodb";
import withBodyConverter from "../../../middleware/withBodyConverter";
import CandidateVideoAnswer from "../../../models/CandidateVideoAnswer";

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

    const interview = {
      region: body.region,
      countryCode: body.countryCode,
      jobId: body.jobId,
    };

    body.interviews = [interview];

    let candidate = new Candidate(body);
    let candidateVideoAnswer = new CandidateVideoAnswer({
      candidateId: candidate._id,
      answers: body.answers,
    });

    try {
      var foundCandidate: ICandidateDocument | null = await Candidate.findOne({
        email: body.email,
        companyId: body.companyId,
      });

      if (!foundCandidate) {
        await Promise.all([candidate.save(), candidateVideoAnswer.save()]);
      } else {
        if (
          !(foundCandidate as ICandidateDocument).interviews
            .map((interview: ICandidateInterviewDocument) => interview.jobId)
            .includes(body.jobId)
        ) {
          await foundCandidate.updateOne({
            $push: {
              interviews: interview,
            },
          });
        } else {
          return res
            .status(400)
            .json({ error: "Candidate already applied to the job position." });
        }
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
