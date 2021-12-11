import { NextApiRequest, NextApiResponse } from "next";
import handleError from "../../../helpers/errorHandler";
import { Roles } from "../../../types";
import Candidate from "../../../models/Candidate";
import withValidation from "../../../middleware/validation";
import { favoriteSchema } from "../../../models/api/Candidate";
import withProtection from "../../../middleware/protection";
import CustomError from "../../../helpers/CustomError";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PATCH") {
    const { id, favorite } = req.query;

    try {
      // @ts-ignore
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
  }

  return res.status(405).json({ error: "Only PATCH requests are allowed." });
};

export default withValidation(
  favoriteSchema,
  withProtection(handler, [Roles.Manager, Roles.Admin]),
  true
);
