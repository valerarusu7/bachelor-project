import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../utils/dbConnect";
import Template from "../../../models/Template";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const id: string = req.query.id as string;

  if (req.method === "GET") {
    try {
      await dbConnect();
      const template = await Template.findById(id);
      if (template == null) {
        return res.status(404).json({
          success: false,
          error: "No template with specified id found.",
        });
      }

      return res.status(200).json({
        template,
      });
    } catch (error) {
      return res.status(404).json({ success: false, error: error });
    }
  }

  if (req.method === "PUT") {
    try {
      await dbConnect();
      await Template.findByIdAndUpdate(id, req.body, {
        new: true,
      });

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
      await dbConnect();
      await Template.findByIdAndDelete(id);
      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({ success: false, error: error });
    }
  }
};
