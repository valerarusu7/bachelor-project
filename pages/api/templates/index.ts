import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../middleware/mongodb";
import Template from "../../../models/Template";
import JobPosition from "../../../models/JobPosition";
import Task from "../../../models/Task";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const templates = await Template.find().lean();

      const modifiedTemplates = templates.map(async (template) => {
        const tasks = await Task.find({
          templateId: templates[0]._id,
        });
        const taskTypes = tasks.map((task) => task.taskType);
        if (taskTypes.length != 0) {
          template["multiple"] = taskTypes.includes("multiple");
          template["mail"] = taskTypes.includes("mail");
          template["single"] = taskTypes.includes("single");
          template["code"] = taskTypes.includes("code");
          template["tasks"] = taskTypes.length;
        }
        return template;
      });

      const result = await Promise.all(modifiedTemplates);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(404).json({ success: false, error: error });
    }
  }

  if (req.method === "POST") {
    try {
      const body = req.body;
      JobPosition.countDocuments(
        { _id: body.jobId },
        async function (err, count) {
          if (count == 1) {
            const template = await Template.create(body);

            const tasks = body["tasks"].map((task) => ({
              ...task,
              templateId: template._id,
            }));

            await Task.insertMany(tasks);

            return res
              .status(201)
              .json({ success: true, templateId: template._id.toString() });
          } else {
            return res.status(400).json({
              success: false,
              message: "Template should be linked with existing job id.",
            });
          }
        }
      );
    } catch (error) {
      return res.status(400).json({ success: false, error: error });
    }
  }
};

export default connectDB(handler);
