import User from "../../../models/User";
import handleError from "../../../helpers/errorHandler";
import { Roles } from "../../../types";
import withProtection from "../../../middleware/protection";
import withValidation from "../../../middleware/validation";
import { roleSchema } from "../../../models/api/User";
import CustomError from "../../../helpers/CustomError";
import handler from "../../../utils/handler";

export default handler
  .use(withValidation(roleSchema, true))
  .use(withProtection([Roles.Admin]))
  .patch(async (req, res) => {
    const { id, role } = req.query;
    // @ts-ignore
    const userId = req.id;

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
      ).then((raw) => {
        if (!raw) {
          throw CustomError("400", "User id does not exist.");
        }
      });

      return res.status(200).json({ success: "Role successfully changed." });
    } catch (error) {
      const result = handleError(error as Error);
      return res.status(result.code).json({ error: result.error });
    }
  });
