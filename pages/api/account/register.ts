import { NextApiRequest, NextApiResponse } from "next";
import handleError from "../../../helpers/errorHandler";
import withBodyConverter from "../../../middleware/withBodyConverter";
import withRegistrationProtect from "../../../middleware/withRegistrationProtect";
import User from "../../../models/User";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const body = req.body;
    // @ts-ignore
    const companyId = req.companyId;
    // @ts-ignore
    const email = req.email;

    if (!body.password || !body.rePassword) {
      return res
        .status(400)
        .json({ error: "Password and re-password cannot be empty." });
    }

    if (body.password !== body.rePassword) {
      return res.status(401).json({ error: "Passwords do not match." });
    }

    try {
      let user = new User(body);
      user.email = email;
      user.companyId = companyId;

      await user.save();

      return res
        .status(201)
        .json({ success: "Account successfully registered." });
    } catch (error) {
      const result = handleError(error as Error);
      return res.status(result.code).json({ error: result.error });
    }
  }

  return res.status(405).json({ error: "Only POST requests are allowed." });
};

export default withRegistrationProtect(withBodyConverter(handler));
