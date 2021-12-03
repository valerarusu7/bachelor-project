import { Schema, model, models } from "mongoose";
import {
  ICandidate,
  ICandidateDocument,
  ICandidateInterviewDocument,
  ICandidateAnswerDocument,
  ICandidateModel,
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

CandidateSchema.statics.toClientObject = function (candidate: ICandidate) {
  candidate._id = candidate._id.toString();
  candidate.companyId = candidate.companyId.toString();
  candidate.interviews.forEach((interview) => {
    interview._id = interview._id.toString();
    if (interview.startedUtc !== undefined) {
      interview.startedUtc = interview.startedUtc.toString();
    }
    if (interview.completedUtc !== undefined) {
      interview.completedUtc = interview.completedUtc.toString();
    }
    interview.answers.forEach((answer) => {
      answer._id = answer._id.toString();
      answer.taskId = answer.taskId.toString();
    });
  });
  return candidate;
};

CandidateSchema.statics.toClientArray = function (candidates: ICandidate[]) {
  return candidates.map((candidate) =>
    (this as ICandidateModel).toClientObject(candidate)
  );
};

export default (models.Candidate as ICandidateModel) ||
  model<ICandidateDocument, ICandidateModel>("Candidate", CandidateSchema);
