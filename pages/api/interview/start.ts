import cookie from "cookie";
import withInterviewProtection from "../../../middleware/interviewProtection";
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

export default nextConnect().use(withInterviewProtection()).post(async (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("started", new Date().toISOString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 10 * 24,
      sameSite: "strict",
      path: "/",
    })
  );

  return res.status(201).json({ success: "Interview successfully started." });
});
