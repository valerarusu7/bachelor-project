import { NextApiRequest, NextApiResponse } from "next";
import User from "../../../models/User";
import handleError from "../../../helpers/errorHandler";
import { Roles } from "../../../types";
import withProtection from "../../../middleware/protection";
import withValidation from "../../../middleware/validation";
import { roleSchema } from "../../../models/api/User";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PATCH") {
    const { id, role } = req.query;
    // @ts-ignore
    const userId = req.id;

    if (!role) {
      return res.status(400).json({ error: "Role needs to be specified." });
    }

    if (userId === id) {
      return res
        .status(400)
        .json({ error: "You cannot change role for yourself." });
    }

    try {
      await User.findByIdAndUpdate(
        id,
        { role: role as string },
        { runValidators: true }
      );

      return res.status(200).json({ success: "Role successfully changed." });
    } catch (error) {
      const result = handleError(error as Error);
      return res.status(result.code).json({ error: result.error });
    }
  }

  return res.status(405).json({ error: "Only PATCH requests are allowed." });
};

export default withValidation(
  roleSchema,
  withProtection(handler, [Roles.Admin]),
  true
);
