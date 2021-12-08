import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../utils/mongodb";
import Company from "../../../models/Company";
import handleError from "../../../helpers/errorHandler";
import User from "../../../models/User";
import withBodyConverter from "../../../middleware/withBodyConverter";
import { Roles } from "../../../types";

/**
 * @swagger
 * /api/company/{id}:
 *   put:
 *     description: Returns the company information
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: UUID string of the company to get information
 *      - in: body
 */

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    await connectDB();
    const body = req.body;

    if (!body.user) {
      return res
        .status(400)
        .json({ error: "User information needs to be provided." });
    }

    if (!body.user.password || !body.user.rePassword) {
      return res
        .status(400)
        .json({ error: "Password and re-password cannot be empty." });
    }

    if (body.user.password !== body.user.rePassword) {
      return res.status(401).json({ error: "Passwords do not match." });
    }

    let company = new Company(body.company);
    let user = new User(body.user);

    user.companyId = company._id;
    user.role = Roles.Admin;

    try {
      await user.save();
      await company.save();

      return res.status(201).json({ success: true });
    } catch (error) {
      const result = handleError(error as Error);
      if (result.code === 409) {
        await User.findByIdAndDelete(user._id);
      }

      return res.status(result.code).json({ error: result.error });
    }
  }

  return res.status(405).json({ error: "Only POST requests are allowed." });
};

export default withBodyConverter(handler);
