import { NextApiRequest, NextApiResponse } from "next";
import { AsyncRequestHandler } from "../types";

const withBodyConverter = (handler: AsyncRequestHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const body = req.body;

    if (body) {
      if (body.constructor !== Object) {
        req.body = JSON.parse(body);
      } else {
        req.body = body;
      }
    }

    return handler(req, res);
  };
};

export default withBodyConverter;
