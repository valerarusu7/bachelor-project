import handleError from "../../../helpers/errorHandler";
import { Roles } from "../../../types";
import CandidateComment from "../../../models/CandidateComment";
import withProtection from "../../../middleware/protection";
import withBodyConversion from "../../../middleware/bodyConversion";
import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";

export default nextConnect()
  .use(withProtection([Roles.Manager, Roles.Admin]))
  .use(withBodyConversion())
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    const body = req.body;
    // @ts-ignore
    const userId = req.id;

    let candidateComment = new CandidateComment(body);
    candidateComment.userId = userId;

    try {
      // @ts-ignore
      await candidateComment.save();

      return res
        .status(201)
        .json({
          success: "Successfully added comment.",
          comment: candidateComment,
        });
    } catch (error) {
      const result = handleError(error as Error);
      return res.status(result.code).json({ error: result.error });
    }
  });
