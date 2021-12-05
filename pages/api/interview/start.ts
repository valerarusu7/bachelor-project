import { NextApiRequest, NextApiResponse } from "next";
import withInterviewProtect from "../../../middleware/withInterviewProtect";
import cookie from "cookie";

/**
 * @swagger
 * /api/templates:
 *   post:
 *     description: Create a new template
 */

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    res.setHeader("Set-Cookie", [
      cookie.serialize("started", new Date().toISOString(), {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: 60 * 10 * 24,
        sameSite: "strict",
        path: "/",
      }),
    ]);

    return res.status(201).json({ success: true });
  }

  return res.status(405).json({ error: "Only POST requests are allowed." });
};

export default withInterviewProtect(handler);
