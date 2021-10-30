import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../utils/dbConnect";
import Template from "../../../models/Template";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      await dbConnect();
      const templates = await Template.find().lean();
      const result = templates.map((template) =>
        Object.assign(template, { _id: template._id.toString() })
      );

      return res.status(200).json({
        result,
      });
    } catch (error) {
      return res.status(404).json({ success: false, error: error });
    }
  }

  if (req.method === "POST") {
    try {
      await dbConnect();
      const template = await Template.create(req.body);
      console.log(template);

      return res
        .status(201)
        .json({ success: true, templateId: template._id.toString() });
    } catch (error) {
      return res.status(400).json({ success: false, error: error });
    }
  }
};
