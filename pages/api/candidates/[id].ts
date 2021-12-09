import { NextApiRequest, NextApiResponse } from "next";
import handleError from "../../../helpers/errorHandler";
import { Roles } from "../../../types";
import withProtect from "../../../middleware/withProtect";
import Candidate from "../../../models/Candidate";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PATCH") {
    const { id, favorite } = req.query;

    if (!favorite) {
      return res
        .status(400)
        .json({ error: "Favorite boolean needs to be provided." });
    }

    try {
      // @ts-ignore
      await Candidate.findByIdAndUpdate(
        id,
        // @ts-ignore
        { favorite: favorite },
        { runValidators: true }
      );

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

export default withProtect(handler, [Roles.Manager, Roles.Admin]);
