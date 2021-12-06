import jwt from "jsonwebtoken";

const { ACCOUNT_ACCESS_PRIVATE_KEY } = process.env;

export default function protect(accessToken: string) {
  if (!accessToken) {
    return { status: false, payload: {} };
  }
  const decoded = jwt.verify(accessToken, ACCOUNT_ACCESS_PRIVATE_KEY as string);
  return { status: true, payload: decoded };
}
