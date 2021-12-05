import { NextApiRequest, NextApiResponse } from "next";
import Template from "../../../models/Template";
import handleError from "../../../helpers/errorHandler";
import withProtect from "../../../middleware/withProtect";
import withBodyConverter from "../../../middleware/withBodyConverter";
import { Roles } from "../../../types";

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

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  const body = req.body;

  if (req.method === "PUT") {
    try {
      let template = new Template(body);

      template.tasks.forEach((task, index) => {
        task.order = index;
      });

      await Template.findByIdAndUpdate(id, template);

      return res.status(200).json({ success: true });
    } catch (error) {
      const result = handleError(error as Error);
      return res.status(result.code).json({ error: result.error });
    }
  }

  if (req.method === "DELETE") {
    try {
      await Template.findByIdAndDelete(id);

      return res.status(200).json({ success: true });
    } catch (error) {
      const result = handleError(error as Error);
      return res.status(result.code).json({ error: result.error });
    }
  }

  return res
    .status(405)
    .json({ error: "Only PUT and DELETE requests are allowed." });
};

export default withProtect(withBodyConverter(handler), [
  Roles.Manager,
  Roles.Admin,
]);
