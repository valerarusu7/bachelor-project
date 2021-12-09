import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../utils/mongodb";
import Company from "../../../models/Company";
import { Roles } from "../../../types";
import handleError from "../../../helpers/errorHandler";
import withProtection from "../../../middleware/protection";
import { websiteSchema } from "../../../models/api/Company";
import withValidation from "../../../middleware/validation";

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
  if (req.method === "PATCH") {
    await connectDB();
    const { id } = req.query;
    const body = req.body;

    try {
      await Company.findByIdAndUpdate(id, { website: body.website });

      return res
        .status(200)
        .json({ success: "Company details successfully changed." });
    } catch (error) {
      const result = handleError(error as Error);
      return res.status(result.code).json({ error: result.error });
    }
  }

  return res.status(405).json({ error: "Only PATCH requests are allowed." });
};

export default withValidation(
  websiteSchema,
  withProtection(handler, [Roles.Manager, Roles.Admin])
);
