import handleError from "../../../helpers/errorHandler";
import { Roles } from "../../../types";
import CandidateComment from "../../../models/CandidateComment";
import withProtection from "../../../middleware/protection";
import withBodyConversion from "../../../middleware/bodyConversion";
import handler from "../../../utils/handler";

export default handler
  .use(withProtection([Roles.Manager, Roles.Admin]))
  .use(withBodyConversion())
  .post(async (req, res) => {
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
  });
