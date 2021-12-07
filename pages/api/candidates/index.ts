import { NextApiRequest, NextApiResponse } from "next";
import Candidate from "../../../models/Candidate";
import {
  ICandidateVideoInterviewAnswer,
  ICandidateDocument,
  ICandidateInterviewDocument,
} from "../../../types";
import handleError from "../../../helpers/errorHandler";
import connectDB from "../../../utils/mongodb";
import withBodyConverter from "../../../middleware/withBodyConverter";
import CandidateVideoInterview from "../../../models/CandidateVideoInterview";
import { Types } from "mongoose";

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

    if (!body.answers || !Array.isArray(body.answers)) {
      return res.status(400).json({ error: "Video answers cannot be empty." });
    }

    const interview = {
      region: body.answers.find(
        (answer: ICandidateVideoInterviewAnswer) => answer.order === 3
      ).answer,
      jobId: body.jobId,
    };

    body.interviews = [interview];

    let candidate = new Candidate(body);
    candidate.companyId = new Types.ObjectId("6182887f8a051eb01be80084");

    let candidateVideoAnswer = new CandidateVideoInterview({
      candidateId: candidate._id,
      answers: body.answers,
    });

    try {
      var foundCandidate: ICandidateDocument | null = await Candidate.findOne({
        email: body.email,
        companyId: "6182887f8a051eb01be80084",
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
