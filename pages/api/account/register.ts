import { NextApiRequest, NextApiResponse } from "next";
import handleError from "../../../helpers/errorHandler";
import withBodyConverter from "../../../middleware/withBodyConverter";
import withRegistrationProtect from "../../../middleware/withRegistrationProtect";
import User from "../../../models/User";
import { Roles } from "../../../types";

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

    if (!body.birthday) {
      return res.status(400).json({ error: "Birthday needs to be provided." });
    }
    body.birthday = body.birthday + "T00:00:00.000Z";

    try {
      let user = new User(body);
      user.email = email;
      user.companyId = companyId;
      user.role = Roles.Viewer;

      await user.save();

      return res.status(201).json({ success: true });
    } catch (error) {
      const result = handleError(error as Error);
      return res.status(result.code).json({ error: result.error });
    }
  }

  return res.status(405).json({ error: "Only POST requests are allowed." });
};

export default withRegistrationProtect(withBodyConverter(handler));
