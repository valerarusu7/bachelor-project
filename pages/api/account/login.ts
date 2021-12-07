import { NextApiRequest, NextApiResponse } from "next";
import User from "../../../models/User";
import handleError from "../../../helpers/errorHandler";
import connectDB from "../../../utils/mongodb";
import withBodyConverter from "../../../middleware/withBodyConverter";
import setTokensInCookie from "../../../helpers/authCookie";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    await connectDB();
    const body = req.body;

    if (!body || !body.email || !body.password) {
      return res
        .status(400)
        .json({ error: "Email and password cannot be empty." });
    }

    try {
      const user = await User.findOne({
        email: body.email,
      });

      if (!user || !(await user.comparePassword(body.password))) {
        return res
          .status(401)
          .json({ error: "Email or password is incorrect." });
      }

      setTokensInCookie(
        res,
        {
          id: user._id,
          email: user.email,
          name: user.firstName + " " + user.lastName,
          companyId: user.companyId,
          role: user.role,
        },
        {
          id: user._id,
        }
      );

      return res.status(200).json({ success: "Successfully logged in." });
    } catch (error) {
      const result = handleError(error as Error);
      return res.status(result.code).json({ error: result.error });
    }
  }

  return res.status(405).json({ error: "Only POST requests are allowed." });
};

export default withBodyConverter(handler);
