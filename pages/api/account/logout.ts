import { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";
import { Roles } from "../../../types";
import withProtection from "../../../middleware/protection";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
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
  }

  return res.status(405).json({ error: "Only GET requests are allowed." });
};

export default withProtection(handler);
