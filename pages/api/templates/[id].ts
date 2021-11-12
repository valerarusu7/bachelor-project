import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../utils/mongodb";
import Template from "../../../models/Template";
import { ITemplateDocument, ITaskDocument } from "../../../types";
import HandleError from "../../../helpers/ErrorHandler";

/**
 * @swagger
 * /api/templates/{id}:
 *   put:
 *     description: Update template
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: UUID string of the template to update
 *   delete:
 *     description: Delete template
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: UUID string of the template to delete
 */

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const id: string = req.query.id as string;
  await connectDB();

  if (req.method === "PUT") {
    try {
      const body = req.body;
      let template: ITemplateDocument;
      if (body.constructor !== Object) {
        template = new Template(JSON.parse(body));
      } else {
        template = new Template(body);
      }

      template.tasks.forEach((task, index) => {
        task.order = index;
      });

      await Template.findByIdAndUpdate(id, template);

      return res.status(200).json({ success: true });
    } catch (error) {
      const result = HandleError(error as Error);
      console.log(result);
      return res.status(result.code).json({ error: result.error });
    }
  }

  if (req.method === "DELETE") {
    try {
      await Template.findByIdAndDelete(id);

      return res.status(200).json({ success: true });
    } catch (error) {
      const result = HandleError(error as Error);
      return res.status(result.code).json({ error: result.error });
    }
  }
};
