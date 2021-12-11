import { NextApiRequest, NextApiResponse } from "next";
import { NextHandler } from "next-connect";
import { AnySchema } from "yup";

const withValidation = (schema: AnySchema, queryParam: boolean = false) => {
  return async (
    req: NextApiRequest,
    res: NextApiResponse,
    next: NextHandler
  ) => {
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

    return next();
  };
};

export default withValidation;
