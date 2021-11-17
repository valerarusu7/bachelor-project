import { IInterviewToken } from "../types";
import jwt from "jsonwebtoken";

export default function verifyAuthValue(authValue: string | undefined) {
  const { JWT_INTERVIEW_PRIVATE_KEY } = process.env;
  if (authValue === undefined) {
    throw new Error("No authentication provided.");
  }
  const token = authValue.replace("Bearer ", "");
  var decodedToken = jwt.verify(token, JWT_INTERVIEW_PRIVATE_KEY as string);

  const { interviewId } = decodedToken as IInterviewToken;
  return interviewId;
}
