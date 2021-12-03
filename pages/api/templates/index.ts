import { NextApiRequest, NextApiResponse } from "next";
import handleError from "../../../helpers/errorHandler";
import withProtect from "../../../middleware/withProtect";
import Template from "../../../models/Template";
import { ITemplateDocument } from "../../../types";

/**
 * @swagger
 * /api/templates:
 *   post:
 *     description: Create a new template
 */

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const body = req.body;
      let template: ITemplateDocument;
      if (body.constructor !== Object) {
        template = new Template(JSON.parse(body));
      } else {
        template = new Template(body);
      }

      const savedTemplate = await template.save();

      return res.status(201).json({ templateId: savedTemplate._id.toString() });
    } catch (error) {
      const result = handleError(error as Error);
      return res.status(result.code).json({ error: result.error });
    }
  }
};

export default withProtect(handler, ["manager", "admin"]);
