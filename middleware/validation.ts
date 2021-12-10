import next, { NextApiRequest, NextApiResponse } from "next";
import { AnySchema } from "yup";
import { AsyncRequestHandler } from "../types";

const withValidation = (
  schema: AnySchema,
  handler: AsyncRequestHandler,
  queryParam: boolean = false
) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.body && req.body.constructor !== Object) {
      req.body = JSON.parse(req.body);
    }

    try {
      queryParam
        ? await schema.validate(req.query)
        : await schema.validate(req.body);
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }

    return handler(req, res);
  };
};

export default withValidation;
