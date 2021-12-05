import Template from "../../../models/Template";
import { NextApiRequest, NextApiResponse } from "next";
import handleError from "../../../helpers/errorHandler";
import Candidate from "../../../models/Candidate";
import withInterviewProtect from "../../../middleware/withInterviewProtect";
import withBodyConverter from "../../../middleware/withBodyConverter";

/**
 * @swagger
 * /api/templates:
 *   post:
 *     description: Create a new template
 */

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const body = req.body;
    const { order } = req.query;
    //@ts-ignore
    const interviewId = req.interviewId;
    //@ts-ignore
    const started = req.started;

    if (!started) {
      return res.status(400).json({ error: "Interview has not started yet." });
    }

    try {
      const candidate = await Candidate.findOne({
        "interviews._id": interviewId,
      }).orFail();

      const foundInterview = candidate.interviews.find(
        (interview) => interview._id.toString() === interviewId
      );
      if (!foundInterview) {
        return res.status(404).json({ error: "No template found." });
      }

      foundInterview.answers.push(body);
      await candidate.save();

      const template = await Template.findOne({
        jobId: foundInterview.jobId,
      })
        .lean()
        .orFail();

      var task = template.tasks.find(
        (item) => item.order == parseInt(order as string) + 1
      );

      return res.status(201).json(task);
    } catch (error) {
      const result = handleError(error as Error);
      return res.status(result.code).json({ error: result.error });
    }
  }

  return res.status(405).json({ error: "Only POST requests are allowed." });
};

export default withInterviewProtect(withBodyConverter(handler));
