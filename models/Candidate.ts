import { Schema, model, models } from "mongoose";
import {
  ICandidateDocument,
  ICandidateInterviewDocument,
  ICandidateAnswerDocument,
} from "../types";
import "./JobPosition";

const CandidateAnswerSchema = new Schema<ICandidateAnswerDocument>({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
  },
  taskId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "JobPosition",
  },
  answer: {
    type: String,
    required: true,
  },
});

const CandidateInterviewSchema = new Schema<ICandidateInterviewDocument>({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
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
  favorite: {
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
  answers: [CandidateAnswerSchema],
  jobId: {
    type: String,
    required: true,
    unique: true,
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
  companyId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Company",
  },
  interviews: [CandidateInterviewSchema],
});

export default models.Candidate ||
  model<ICandidateDocument>("Candidate", CandidateSchema);
