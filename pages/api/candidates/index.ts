import Candidate from "../../../models/Candidate";
import {
  ICandidateVideoInterviewAnswer,
  ICandidateDocument,
} from "../../../types";
import handleError from "../../../helpers/errorHandler";
import connectDB from "../../../utils/mongodb";
import CandidateVideoInterview from "../../../models/CandidateVideoInterview";
import { Types } from "mongoose";
import CustomError from "../../../helpers/CustomError";
import withValidation from "../../../middleware/validation";
import { answersSchema } from "../../../models/api/Candidate";
import handler from "../../../utils/handler";

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

export default handler
  .use(withValidation(answersSchema))
  .post(async (req, res) => {
    await connectDB();
    const body = req.body;

    const interview = {
      region: body.answers.find(
        (answer: ICandidateVideoInterviewAnswer) => answer.order === 3
      ).answer,
      jobId: body.jobId,
    };

    try {
      var foundCandidate: ICandidateDocument | null = await Candidate.findOne({
        email: body.email,
        companyId: "6182887f8a051eb01be80084",
      });

      if (!foundCandidate) {
        body.interviews = [interview];
        let candidate = new Candidate(body);
        candidate.companyId = new Types.ObjectId("6182887f8a051eb01be80084");

        let candidateVideoInterview = new CandidateVideoInterview({
          candidateId: candidate._id,
          answers: body.answers,
        });

        await Promise.all([candidate.save(), candidateVideoInterview.save()]);
      } else {
        await Candidate.updateOne(
          {
            _id: foundCandidate._id,
            "interviews.jobId": {
              $ne: interview.jobId,
            },
          },
          {
            $push: {
              interviews: interview,
            },
          }
        ).then((raw) => {
          if (raw.modifiedCount === 0) {
            throw CustomError(
              "409",
              "Candidate already applied to the job position."
            );
          }
        });

        await CandidateVideoInterview.findOneAndUpdate(
          {
            candidateId: foundCandidate._id,
          },
          { answers: body.answers },
          { runValidators: true }
        );
      }

      return res
        .status(201)
        .json({ success: "Candidate details successfully added." });
    } catch (error) {
      const result = handleError(error as Error);
      return res.status(result.code).json({ error: result.error });
    }
  });
