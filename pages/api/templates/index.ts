import { NextApiRequest, NextApiResponse } from "next";
import HandleError from "../../../helpers/ErrorHandler";
import Template from "../../../models/Template";
import { ITemplateDocument } from "../../../types";
import connectDB from "../../../utils/mongodb";

/**
 * @swagger
 * /api/templates:
 *   post:
 *     description: Create a new template
 */

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();

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
      const result = HandleError(error as Error);
      return res.status(result.code).json({ error: result.error });
    }
  }
};
