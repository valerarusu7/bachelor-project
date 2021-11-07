import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../utils/mongodb";
import Task from "../../../models/Task";
import { ITask, ITaskDocument } from "../../../types";

connectDB();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const id: string = req.query.id as string;

  if (req.method === "PUT") {
    try {
      const taskData: ITask = req.body;

      const task: ITaskDocument = await Task.findByIdAndUpdate(id, taskData, {
        new: true,
      });

      return res.status(200).json({
        success: true,
        task,
      });
    } catch (error) {
      return res.status(404).json({ success: false, error: error });
    }
  }
};
