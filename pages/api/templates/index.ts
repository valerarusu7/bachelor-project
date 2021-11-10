import { NextApiRequest, NextApiResponse } from "next";

import JobPosition from "../../../models/JobPosition";
import Template from "../../../models/Template";
import connectDB from "../../../utils/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await connectDB();

  if (req.method === "POST") {
    try {
      const body = req.body;
      console.log(body);

      const template = await Template.create(body);

      return res
        .status(201)
        .json({ success: true, templateId: template._id.toString() });
    } catch (error) {
      return res.status(400).json({ success: false, error: error });
    }
  }
};
