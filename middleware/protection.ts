import { NextApiRequest, NextApiResponse } from "next";
import { AsyncRequestHandler, IAccessTokenPayload, Roles } from "../types";
import protect from "../helpers/protect";

const withProtection = (
  handler: AsyncRequestHandler,
  roles: string[] = [Roles.Viewer, Roles.Manager, Roles.Admin]
) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const protection = await protect(req, res);
    if (!protection.status && !protection.payload) {
      return res.status(401).json({ error: "You need to login." });
    }

    const payload = protection.payload as IAccessTokenPayload;

    if (!roles.includes(payload.role)) {
      return res
        .status(401)
        .json({ error: "You don't have enough permissions." });
    }

    // @ts-ignore
    req.id = payload.id;
    // @ts-ignore
    req.name = payload.name;
    // @ts-ignore
    req.companyId = payload.companyId;

    return handler(req, res);
  };
};

export default withProtection;
