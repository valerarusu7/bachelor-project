import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../utils/mongodb";
import Company from "../../../models/Company";
import { ICompanyDocument, Roles } from "../../../types";
import handleError from "../../../helpers/errorHandler";
import withProtect from "../../../middleware/withProtect";
import withBodyConverter from "../../../middleware/withBodyConverter";

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
  if (req.method === "PUT") {
    await connectDB();
    const { id } = req.query;
    const body = req.body;

    try {
      const company: ICompanyDocument = await Company.findByIdAndUpdate(
        id,
        body,
        {
          new: true,
        }
      );

      return res.status(200).json(company);
    } catch (error) {
      const result = handleError(error as Error);
      return res.status(result.code).json({ error: result.error });
    }
  }

  return res.status(405).json({ error: "Only PUT requests are allowed." });
};

export default withProtect(withBodyConverter(handler), [Roles.Manager, Roles.Admin]);
