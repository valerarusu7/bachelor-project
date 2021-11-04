import { Schema, model, models } from "mongoose";
import { IPositionDocument } from "../types";

const JobPositionSchema = new Schema<IPositionDocument>({
  _id: String,
  name: String,
  openings: Number,
  targetHireDate: Date,
  status: String,
  requestCompletedDate: Date,
  location: String,
  profile: String,
  supervisoryOrganization: String,
  recruitingStartDate: Date,
});

export default models.JobPosition ||
  model<IPositionDocument>("JobPosition", JobPositionSchema);
