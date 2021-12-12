import User from "../../../models/User";
import handleError from "../../../helpers/errorHandler";
import connectDB from "../../../utils/mongodb";
import setTokensInCookie from "../../../helpers/authCookie";
import withValidation from "../../../middleware/validation";
import { loginSchema } from "../../../models/api/User";
import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";

export default nextConnect()
  .use(withValidation(loginSchema))
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
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
      let login_user = {
        id: user._id,
        email: user.email,
        name: name,
        companyId: user.companyId,
        role: user.role,
      };
      setTokensInCookie(res, login_user, {
        id: user._id,
      });

      return res
        .status(200)
        .json({ success: "Successfully logged in.", user: user });
    } catch (error) {
      const result = handleError(error as Error);
      return res.status(result.code).json({ error: result.error });
    }
  });
