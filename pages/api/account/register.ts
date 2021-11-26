import { NextApiRequest, NextApiResponse } from "next";
import handleError from "../../../helpers/errorHandler";
import User from "../../../models/User";
import { IUserDocument } from "../../../types";
import connectDB from "../../../utils/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    return res.status(405).json({ error: "Only POST requests are allowed." });
  }
  const body = req.body;
  await connectDB();

  try {
    if (!body.password || !body.rePassword) {
      return res
        .status(400)
        .json({ error: "Password and re-password cannot be empty." });
    }

    if (body.password !== body.rePassword) {
      return res.status(401).json({ error: "Passwords do not match" });
    }

    let user: IUserDocument;
    if (body.constructor !== Object) {
      user = new User(JSON.parse(body));
    } else {
      user = new User(body);
    }

    await user.save();

    return res.status(201).json({ success: true });
  } catch (error) {
    const result = handleError(error as Error);
    return res.status(result.code).json({ error: result.error });
  }
};
