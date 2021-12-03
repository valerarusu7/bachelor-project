import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
import withProtect from "../../../middleware/withProtect";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests are allowed." });
  }

  res.setHeader("Set-Cookie", [
    cookie.serialize("accessToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      expires: new Date(0),
      sameSite: "strict",
      path: "/api/",
    }),
    cookie.serialize("refreshToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      expires: new Date(0),
      sameSite: "strict",
      path: "/api/",
    }),
  ]);

  return res.status(200).json({
    success: "Successfully logged out",
  });
};

export default withProtect(handler, ["viewer", "manager", "admin"]);
