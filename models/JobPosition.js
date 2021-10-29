import mongoose from "mongoose";

const JobPositionSchema = new mongoose.Schema({
  jobId: {
    type: String,
    required: true,
  },
  name: String,
});

module.exports =
  mongoose.models.JobPosition ||
  mongoose.model("JobPosition", JobPositionSchema);
