import { NextApiRequest, NextApiResponse } from "next";
import { AsyncRequestHandler } from "../types";

const withBodyConversion = (handler: AsyncRequestHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.body && req.body.constructor !== Object) {
      req.body = JSON.parse(req.body);
    }

    return handler(req, res);
  };
};
export default withBodyConversion;
