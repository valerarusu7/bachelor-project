import Template from "../../../models/Template";
import handleError from "../../../helpers/errorHandler";
import { Roles } from "../../../types";
import withBodyConversion from "../../../middleware/bodyConversion";
import withProtection from "../../../middleware/protection";
import CustomError from "../../../helpers/CustomError";
import handler from "../../../utils/handler";

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

export default handler
  .use(withProtection([Roles.Manager, Roles.Admin]))
  .use(withBodyConversion())
  .put(async (req, res) => {
    const { id } = req.query;
    const body = req.body;
    try {
      let template = new Template(body);

      template.tasks.forEach((task, index) => {
        task.order = index;
      });

      await Template.findByIdAndUpdate(id, template, {
        runValidators: true,
      }).then((raw) => {
        if (!raw) {
          throw CustomError("400", "Template id does not exist.");
        }
      });

      return res
        .status(200)
        .json({ success: "Template successfully updated." });
    } catch (error) {
      const result = handleError(error as Error);
      return res.status(result.code).json({ error: result.error });
    }
  })
  .delete(async (req, res) => {
    const { id } = req.query;
    try {
      await Template.findByIdAndDelete(id);

      return res
        .status(200)
        .json({ success: "Template successfully deleted." });
    } catch (error) {
      const result = handleError(error as Error);
      return res.status(result.code).json({ error: result.error });
    }
  });
