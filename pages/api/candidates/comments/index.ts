import { NextApiRequest, NextApiResponse } from "next";
import handleError from "../../../../helpers/errorHandler";
import { Roles } from "../../../../types";
import withProtect from "../../../../middleware/withProtect";
import withBodyConverter from "../../../../middleware/withBodyConverter";
import CandidateComment from "../../../../models/CandidateComment";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { candidateId } = req.query;
    const body = req.body;
    // @ts-ignore
    const userId = req.id;

    let candidateComment = new CandidateComment(body);
    candidateComment.candidateId = candidateId;
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

export default withProtect(withBodyConverter(handler), [
  Roles.Manager,
  Roles.Admin,
]);
