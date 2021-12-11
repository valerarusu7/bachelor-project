import handleError from "../../../helpers/errorHandler";
import withBodyConversion from "../../../middleware/bodyConversion";
import withProtection from "../../../middleware/protection";
import Template from "../../../models/Template";
import { Roles } from "../../../types";
import handler from "../../../utils/handler";

/**
 * @swagger
 * /api/templates:
 *   post:
 *     description: Create a new template
 */

export default handler
  .use(withProtection([Roles.Manager, Roles.Admin]))
  .use(withBodyConversion())
  .post(async (req, res) => {
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
  });
