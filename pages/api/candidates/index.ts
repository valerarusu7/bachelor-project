import { NextApiRequest, NextApiResponse } from "next";
import Candidate from "../../../models/Candidate";
import {
  ICandidateDocument,
  ICandidateInterviewDocument,
} from "../../../types";
import handleError from "../../../helpers/errorHandler";
import withProtect from "../../../middleware/withProtect";
import Template from "../../../models/Template";
import connectDB from "../../../utils/mongodb";

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

  if (req.method === "GET") {
    try {
      const { templateId } = req.query;
      if (!templateId) {
        return res
          .status(400)
          .json({ error: "Query parameter template id is required." });
      }

      let template = await Template.findById(templateId).select("jobId").lean();
      if (!template) {
        return res
          .status(404)
          .json({ error: "Cannot find template with given template id." });
      }

      console.log(template);

      const candidates = await Candidate.find({
        interviews: { $elemMatch: { jobId: template.jobId, completed: false } },
      })
        .select("firstName lastName email")
        .lean();

      return res.status(200).json(candidates);
    } catch (error) {
      const result = handleError(error as Error);
      return res.status(result.code).json({ error: result.error });
    }
  }

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
