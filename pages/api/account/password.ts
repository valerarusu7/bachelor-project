import { NextApiRequest, NextApiResponse } from "next";
import handleError from "../../../helpers/errorHandler";
import User from "../../../models/User";
import withValidation from "../../../middleware/validation";
import withProtection from "../../../middleware/protection";
import { changePasswordSchema } from "../../../models/api/User";

/**
 * @swagger
 * /api/templates:
 *   post:
 *     description: Create a new template
 */

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PATCH") {
    const body = req.body;
    // @ts-ignore
    const id = req.id;

    if (body.newPassword !== body.reNewPassword) {
      return res.status(401).json({ error: "Passwords do not match." });
    }

    try {
      const user = await User.findById(id);

      if (!user || !(await user.comparePassword(body.password))) {
        return res.status(401).json({ error: "Password is incorrect." });
      }

      user.password = body.newPassword;
      await user.save();

      return res.status(201).json({ success: "Password successfully saved." });
    } catch (error) {
      const result = handleError(error as Error);
      return res.status(result.code).json({ error: result.error });
    }
  }

  return res.status(405).json({ error: "Only PATCH requests are allowed." });
};

export default withValidation(changePasswordSchema, withProtection(handler));