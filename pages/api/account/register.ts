import { NextApiRequest, NextApiResponse } from "next";
import handleError from "../../../helpers/errorHandler";
import withBodyConverter from "../../../middleware/withBodyConverter";
import User from "../../../models/User";
import connectDB from "../../../utils/mongodb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    await connectDB();
    const body = req.body;

    if (!body.password || !body.rePassword) {
      return res
        .status(400)
        .json({ error: "Password and re-password cannot be empty." });
    }

    if (body.password !== body.rePassword) {
      return res.status(401).json({ error: "Passwords do not match" });
    }

    try {
      let user = new User(body);
      await user.save();

      return res.status(201).json({ success: true });
    } catch (error) {
      const result = handleError(error as Error);
      return res.status(result.code).json({ error: result.error });
    }
  }

  return res.status(405).json({ error: "Only POST requests are allowed." });
};

export default withBodyConverter(handler);
