import { Schema, model, models } from "mongoose";
import { IJobPosition } from "../types";

const JobPositionSchema = new Schema<IJobPosition>({
  _id: String,
  name: String,
  openings: Number,
  targetHireDate: Date,
  status: String,
  requestCompletedDate: Date,
  profile: String,
  supervisoryOrganization: String,
  recruitingStartDate: Date,
});

export default models.JobPosition ||
  model<IJobPosition>("JobPosition", JobPositionSchema);
