import jwt, { JwtPayload } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import User from "../models/User";
import { IAccessTokenPayload, IProtection } from "../types";
import connectDB from "../utils/mongodb";
import setTokensInCookie from "./authCookie";

const { ACCOUNT_ACCESS_PRIVATE_KEY, ACCOUNT_REFRESH_PRIVATE_KEY } = process.env;

export default async function protect(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<IProtection> {
  const { accessToken, refreshToken } = req.cookies;

  await connectDB();

  if (!accessToken) {
    return { status: false, payload: undefined };
  }

  try {
    const decodedAccessToken = jwt.verify(
      accessToken,
      ACCOUNT_ACCESS_PRIVATE_KEY as string
    ) as IAccessTokenPayload;

    return { status: true, payload: decodedAccessToken };
  } catch (error) {
    let decodedAccessToken;

    if ((error as Error).name === "TokenExpiredError") {
      decodedAccessToken = jwt.verify(
        accessToken,
        ACCOUNT_ACCESS_PRIVATE_KEY as string,
        {
          ignoreExpiration: true,
        }
      ) as JwtPayload;
    } else {
      return { status: false, payload: undefined };
    }

    const accessPayload = (({ id, email, name, companyId, role }) => ({
      id,
      email,
      name,
      companyId,
      role,
    }))(decodedAccessToken);

    //Check that access token has everything
    const currentUser = await User.findById(accessPayload.id).lean();
    if (!currentUser) {
      return { status: false, payload: undefined };
    }

    if (!refreshToken) {
      return { status: false, payload: undefined };
    }

    try {
      const decodedRefreshToken = jwt.verify(
        refreshToken,
        ACCOUNT_REFRESH_PRIVATE_KEY as string
      );

      const refreshPayload = (({ id }) => ({ id }))(
        decodedRefreshToken as JwtPayload
      );

      setTokensInCookie(res, accessPayload, refreshPayload);

      return { status: true, payload: accessPayload };
    } catch (error) {
      return { status: false, payload: undefined };
    }
  }
}
