import Template from "../../../models/Template";
import handleError from "../../../helpers/errorHandler";
import { Roles } from "../../../types";
import withBodyConversion from "../../../middleware/bodyConversion";
import withProtection from "../../../middleware/protection";
import CustomError from "../../../helpers/CustomError";
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

export default nextConnect()
  .use(withProtection([Roles.Manager, Roles.Admin]))
  .use(withBodyConversion())
  .put(async (req: NextApiRequest, res: NextApiResponse) => {
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
  .delete(async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;
    try {
      await Template.findByIdAndDelete(id).then((raw) => {
        if (!raw) {
          throw CustomError("400", "Template id does not exist.");
        }
      });

      return res
        .status(200)
        .json({ success: "Template successfully deleted." });
    } catch (error) {
      const result = handleError(error as Error);
      return res.status(result.code).json({ error: result.error });
    }
  });
