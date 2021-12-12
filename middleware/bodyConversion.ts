import { NextApiRequest, NextApiResponse } from "next";
import { NextHandler } from "next-connect";

const withBodyConversion = () => {
  return async (
    req: NextApiRequest,
    res: NextApiResponse,
    next: NextHandler
  ) => {
    if (req.body && req.body.constructor !== Object) {
      req.body = JSON.parse(req.body);
    }

    return next();
  };
};
export default withBodyConversion;
