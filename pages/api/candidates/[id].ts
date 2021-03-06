import handleError from "../../../helpers/errorHandler";
import { Roles } from "../../../types";
import Candidate from "../../../models/Candidate";
import withValidation from "../../../middleware/validation";
import { favoriteSchema } from "../../../models/api/Candidate";
import withProtection from "../../../middleware/protection";
import CustomError from "../../../helpers/CustomError";
import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import CandidateComment from "../../../models/CandidateComment";
import CandidateVideoInterview from "../../../models/CandidateVideoInterview";

const validation = nextConnect().patch(
  "/api/candidates/:id",
  withValidation(favoriteSchema, true)
);

export default nextConnect()
  .use(validation)
  .use(withProtection([Roles.Manager, Roles.Admin]))
  .patch(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { id, favorite } = req.query;
      await Candidate.findByIdAndUpdate(
        id,
        // @ts-ignore
        { favorite: favorite },
        { runValidators: true }
      ).then((raw) => {
        if (!raw) {
          throw CustomError("400", "Candidate id does not exist.");
        }
      });

      return res.status(200).json({
        success:
          favorite === "true"
            ? "Candidate successfully added to favorites."
            : "Candidate successfully removed from favorites.",
      });
    } catch (error) {
      const result = handleError(error as Error);
      return res.status(result.code).json({ error: result.error });
    }
  })
  .delete(async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const { id } = req.query;

      await Promise.all([
        Candidate.findByIdAndDelete(id),
        CandidateComment.deleteMany({ candidateId: id }),
        CandidateVideoInterview.findOneAndDelete({ candidateId: id }),
      ]);

      return res
        .status(200)
        .json({ success: "Candidate successfully deleted." });
    } catch (error) {
      const result = handleError(error as Error);
      return res.status(result.code).json({ error: result.error });
    }
  });
