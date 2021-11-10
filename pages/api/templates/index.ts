import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../utils/mongodb";
import Template from "../../../models/Template";
import JobPosition from "../../../models/JobPosition";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();

  if (req.method === "POST") {
    try {
      const body = req.body;
      JobPosition.countDocuments(
        { _id: body.jobId },
        async function (err, count) {
          if (count == 1) {
            const template = await Template.create(body);

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
