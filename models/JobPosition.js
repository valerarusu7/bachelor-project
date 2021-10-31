import mongoose from "mongoose";
const Schema = mongoose.Schema;

const JobPositionSchema = new Schema({
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

export default mongoose.models.JobPosition ||
  mongoose.model("JobPosition", JobPositionSchema);
