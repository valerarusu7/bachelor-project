import { Schema, model, models } from "mongoose";
import { ICandidateDocument, ICandidateInterviewDocument } from "../types";

const CandidateInterviewSchema = new Schema<ICandidateInterviewDocument>({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
  },
  position: {
    type: String,
    maxlength: [128, "Position cannot be more than 128 characters."],
  },
  region: {
    type: String,
  },
  countryCode: {
    type: String,
    maxlength: [3, "Country code cannot be more than 3 characters."],
  },
  completed: {
    type: Boolean,
    default: false,
  },
  time: {
    type: String,
    default: "",
  },
  startedUtc: {
    type: Date,
  },
  completedUtc: {
    type: Date,
  },
  score: {
    type: Number,
    default: 0,
  },
  jobId: {
    type: String,
    required: true,
    ref: "JobPosition",
  },
});

const CandidateSchema = new Schema<ICandidateDocument>({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
  },
  firstName: {
    type: String,
    required: true,
    maxlength: [64, "First name cannot be more than 64 characters."],
  },
  lastName: {
    type: String,
    required: true,
    maxlength: [64, "Last name cannot be more than 64 characters."],
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  companyId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Company",
  },
  interviews: [CandidateInterviewSchema],
});

export default models.Candidate ||
  model<ICandidateDocument>("Candidate", CandidateSchema);
