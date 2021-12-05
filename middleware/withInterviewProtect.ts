import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { Error } from "mongoose";
import handleError from "../helpers/errorHandler";
import { AsyncRequestHandler, IInterviewTokenPayload } from "../types";
import connectDB from "../utils/mongodb";

const { INTERVIEW_PRIVATE_KEY } = process.env;

const withInterviewProtect = (handler: AsyncRequestHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const authValue = req.headers.authorization;
    const { started } = req.cookies;

    if (!authValue) {
      return res.status(401).json({ error: "No authentication provided." });
    }

    const token = authValue.replace("Bearer ", "");
    try {
      var decodedToken = jwt.verify(token, INTERVIEW_PRIVATE_KEY as string);
      const { interviewId } = decodedToken as IInterviewTokenPayload;
      if (!interviewId) {
        return res.status(401).json({ error: "Token is invalid" });
      }

      // @ts-ignore
      req.interviewId = interviewId;
      // @ts-ignore
      req.started = started;

      await connectDB();
      return handler(req, res);
    } catch (error) {
      const result = handleError(error as Error);
      return res.status(result.code).json({ error: result.error });
    }
  };
};

export default withInterviewProtect;
