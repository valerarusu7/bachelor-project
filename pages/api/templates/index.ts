import { NextApiRequest, NextApiResponse } from "next";
import handleError from "../../../helpers/errorHandler";
import withBodyConverter from "../../../middleware/withBodyConverter";
import withProtect from "../../../middleware/withProtect";
import Template from "../../../models/Template";
import { Roles } from "../../../types";

/**
 * @swagger
 * /api/templates:
 *   post:
 *     description: Create a new template
 */

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const body = req.body;
    //@ts-ignore
    const companyId = req.companyId;

    try {
      let template = new Template(body);
      template.companyId = companyId;

      await template.save();

      return res
        .status(201)
        .json({ success: "Template successfully created." });
    } catch (error) {
      const result = handleError(error as Error);
      return res.status(result.code).json({ error: result.error });
    }
  }

  return res.status(405).json({ error: "Only POST requests are allowed." });
};

export default withProtect(withBodyConverter(handler), [
  Roles.Manager,
  Roles.Admin,
]);
