import handleError from "../../../helpers/errorHandler";
import withRegistrationProtection from "../../../middleware/registrationProtection";
import withValidation from "../../../middleware/validation";
import { registrationSchema } from "../../../models/api/User";
import User from "../../../models/User";
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

export default nextConnect()
  .use(withValidation(registrationSchema))
  .use(withRegistrationProtection())
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    const body = req.body;
    // @ts-ignore
    const companyId = req.companyId;
    // @ts-ignore
    const email = req.email;

    if (body.password !== body.rePassword) {
      return res.status(400).json({ error: "Passwords do not match." });
    }

    let user = new User(body);
    user.email = email;
    user.companyId = companyId;

    try {
      await user.save();

      return res
        .status(201)
        .json({ success: "Account successfully registered." });
    } catch (error) {
      const result = handleError(error as Error);
      return res.status(result.code).json({ error: result.error });
    }
  });
