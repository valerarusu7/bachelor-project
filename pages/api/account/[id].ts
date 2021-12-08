import { NextApiRequest, NextApiResponse } from "next";
import User from "../../../models/User";
import handleError from "../../../helpers/errorHandler";
import { Roles } from "../../../types";
import withProtect from "../../../middleware/withProtect";

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

      return res.status(201).json({ success: "Successfully changed role." });
    } catch (error) {
      const result = handleError(error as Error);
      return res.status(result.code).json({ error: result.error });
    }
  }

  return res.status(405).json({ error: "Only PATCH requests are allowed." });
};

export default withProtect(handler, [Roles.Admin]);
