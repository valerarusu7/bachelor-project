import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import connectDB from "../utils/mongodb";
import User from "../models/User";
import { Error } from "mongoose";
import handleError from "../helpers/errorHandler";
import { AsyncRequestHandler, IUserRequest, IUserTokenPayload } from "../types";

const { ACCOUNT_ACCESS_PRIVATE_KEY } = process.env;

const withProtect = (handler: AsyncRequestHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const authValue = req.headers.authorization;

    if (!req.headers.authorization || !authValue) {
      return res.status(401).json({ error: "Please login to get access." });
    }

    const accessToken = authValue.replace("Bearer ", "");

    try {
      const decoded = jwt.verify(
        accessToken,
        ACCOUNT_ACCESS_PRIVATE_KEY as string
      );

      await connectDB();
      const currentUser = await User.findById(
        (decoded as IUserTokenPayload).id
      ).lean();
      if (!currentUser) {
        return res.status(401).json({
          error: "The user belonging to this token no longer exists",
        });
      }

      (req as IUserRequest).user = currentUser;

      return handler(req, res);
    } catch (error) {
      const result = handleError(error as Error);
      return res.status(result.code).json({ error: result.error });
    }
  };
};

export default withProtect;
