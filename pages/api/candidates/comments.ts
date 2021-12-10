import { NextApiRequest, NextApiResponse } from "next";
import handleError from "../../../helpers/errorHandler";
import { Roles } from "../../../types";
import CandidateComment from "../../../models/CandidateComment";
import withProtection from "../../../middleware/protection";
import withBodyConversion from "../../../middleware/bodyConversion";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const body = req.body;
    // @ts-ignore
    const userId = req.id;

    let candidateComment = new CandidateComment(body);
    candidateComment.userId = userId;

    try {
      // @ts-ignore
      await candidateComment.save();

      return res.status(201).json({ success: "Successfully added comment." });
    } catch (error) {
      const result = handleError(error as Error);
      return res.status(result.code).json({ error: result.error });
    }
  }

  return res.status(405).json({ error: "Only POST requests are allowed." });
};

export default withProtection(withBodyConversion(handler), [
  Roles.Manager,
  Roles.Admin,
]);
