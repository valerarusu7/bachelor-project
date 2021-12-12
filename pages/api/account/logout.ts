import cookie from "cookie";
import withProtection from "../../../middleware/protection";
import nextConnect from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";

export default nextConnect()
  .use(withProtection())
  .get(async (req: NextApiRequest, res: NextApiResponse) => {
    res.setHeader("Set-Cookie", [
      cookie.serialize("accessToken", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        expires: new Date(0),
        sameSite: "strict",
        path: "/",
      }),
      cookie.serialize("refreshToken", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        expires: new Date(0),
        sameSite: "strict",
        path: "/",
      }),
    ]);

    return res.status(200).json({
      success: "Successfully logged out",
    });
  });
