import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../middleware/mongodb";
import Template from "../../../models/Template";
import JobPosition from "../../../models/JobPosition";
import Task from "../../../models/Task";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const id: string = req.query.id as string;

  if (req.method === "GET") {
    try {
      const template = await Template.findById(id).lean();
      const tasks = await Task.find({ templateId: id });

      if (template == null) {
        return res.status(404).json({
          success: false,
          error: "No template with specified id found.",
        });
      }

      template["tasks"] = tasks;

      return res.status(200).json(template);
    } catch (error) {
      return res.status(404).json({ success: false, error: error });
    }
  }

  if (req.method === "PUT") {
    try {
      const template = req.body;
      JobPosition.countDocuments(
        { _id: template.jobId },
        async function (err, count) {
          if (count == 1) {
            await Template.findByIdAndUpdate(id, template, {
              new: true,
            });
          } else {
            return res.status(400).json({
              success: false,
              message: "Template should be linked with existing job id.",
            });
          }
        }
      );

      return res.status(200).json({
        success: true,
        templateId: id,
      });
    } catch (error) {
      return res.status(404).json({ success: false, error: error });
    }
  }

  if (req.method === "DELETE") {
    try {
      await Template.findByIdAndDelete(id);
      await Task.deleteMany({ templateId: id });
      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({ success: false, error: error });
    }
  }
};

export default connectDB(handler);
