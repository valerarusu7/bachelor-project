import User from "../../../models/User";
import handleError from "../../../helpers/errorHandler";
import connectDB from "../../../utils/mongodb";
import setTokensInCookie from "../../../helpers/authCookie";
import withValidation from "../../../middleware/validation";
import { loginSchema } from "../../../models/api/User";
import handler from "../../../utils/handler";

export default handler
  .use(withValidation(loginSchema))
  .post(async (req, res) => {
    await connectDB();
    const body = req.body;

    try {
      const user = await User.findOne({
        email: body.email,
      });

      if (!user || !(await user.comparePassword(body.password))) {
        return res
          .status(401)
          .json({ error: "Email or password is incorrect." });
      }

      const name = user.firstName + " " + user.lastName;
      setTokensInCookie(
        res,
        {
          id: user._id,
          email: user.email,
          name: name,
          companyId: user.companyId,
          role: user.role,
        },
        {
          id: user._id,
        }
      );

      return res
        .status(200)
        .json({ success: "Successfully logged in.", name: name });
    } catch (error) {
      const result = handleError(error as Error);
      return res.status(result.code).json({ error: result.error });
    }
  });
