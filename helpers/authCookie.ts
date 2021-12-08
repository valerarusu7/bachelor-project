import jwt from "jsonwebtoken";
import { NextApiResponse } from "next";
import cookie from "cookie";
import { IAccessTokenPayload, IRefreshTokenPayload } from "../types";

const { ACCOUNT_ACCESS_PRIVATE_KEY, ACCOUNT_REFRESH_PRIVATE_KEY } = process.env;

export default function setTokensInCookie(
  res: NextApiResponse,
  accessTokenPayload: IAccessTokenPayload,
  refreshTokenPayload: IRefreshTokenPayload
) {
  const accessToken = jwt.sign(
    accessTokenPayload,
    ACCOUNT_ACCESS_PRIVATE_KEY as string,
    { expiresIn: "7m" as string }
  );

  const refreshToken = jwt.sign(
    refreshTokenPayload,
    ACCOUNT_REFRESH_PRIVATE_KEY as string,
    { expiresIn: "3d" as string }
  );

  res.setHeader("Set-Cookie", [
    cookie.serialize("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60 * 24 * 3,
      sameSite: "strict",
      path: "/",
    }),
    cookie.serialize("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60 * 24 * 3,
      sameSite: "strict",
      path: "/",
    }),
  ]);
}
