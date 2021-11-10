import { NextApiRequest, NextApiResponse } from "next";

import Template from "../../../models/Template";
import connectDB from "../../../utils/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();

  if (req.method === "POST") {
    try {
      const body = req.body;
      const template = await Template.create(JSON.parse(body));

      return res
        .status(201)
        .json({ success: true, templateId: template._id.toString() });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ success: false, error: error });
    }
  }
};
