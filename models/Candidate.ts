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
  taskId: {
    type: Schema.Types.ObjectId,
    required: [true, "Task id cannot be empty."],
    ref: "Task",
  },
  answer: {
    type: String,
  },
  choices: [
    {
      type: Number,
      ref: "Choice",
    },
  ],
});

const CandidateInterviewSchema = new Schema<ICandidateInterviewDocument>({
  region: {
    type: String,
    required: [true, "Region cannot be empty."],
  },
  countryCode: {
    type: String,
    maxlength: [3, "Country code cannot be more than 3 characters."],
  },
  completed: {
    type: Boolean,
    default: false,
    required: [true, "Completed cannot be empty."],
  },
  time: {
    type: String,
    trim: true,
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
    required: [true, "Score cannot be empty."],
    min: [0, "Score cannot be negative."],
    max: [100, "Score cannot be over 100%."],
  },
  answers: [CandidateAnswerSchema],
  jobId: {
    type: String,
    required: [true, "Job id cannot be empty."],
    unique: true,
    ref: "JobPosition",
  },
});

const CandidateSchema = new Schema<ICandidateDocument>({
  firstName: {
    type: String,
    required: [true, "First name cannot be empty."],
    maxlength: [64, "First name cannot be more than 64 characters."],
  },
  lastName: {
    type: String,
    required: [true, "Last name cannot be empty."],
    maxlength: [64, "Last name cannot be more than 64 characters."],
  },
  email: {
    type: String,
    required: [true, "Email cannot be empty."],
    maxlength: [64, "Email cannot be more than 64 characters."],
  },
  favorite: {
    type: Boolean,
    default: false,
    required: [true, "Favorite cannot be empty."],
  },
  companyId: {
    type: Schema.Types.ObjectId,
    required: [true, "Company id cannot be empty."],
    ref: "Company",
  },
  interviews: {
    type: [CandidateInterviewSchema],
    required: [true, "Interview details cannot be empty."],
  },
});

CandidateSchema.index({ email: 1, companyId: 1 }, { unique: true });

CandidateSchema.statics.toClientObject = function (candidate: ICandidate) {
  candidate._id = candidate._id.toString();
  if (candidate.companyId) {
    candidate.companyId = candidate.companyId.toString();
  }

  if (candidate.interviews) {
    candidate.interviews.forEach((interview) => {
      interview._id = interview._id.toString();
      if (interview.startedUtc) {
        interview.startedUtc = interview.startedUtc.toString();
      }

      if (interview.completedUtc) {
        interview.completedUtc = interview.completedUtc.toString();
      }

      if (interview.answers) {
        interview.answers.forEach((answer) => {
          answer._id = answer._id.toString();
          answer.taskId = answer.taskId.toString();
        });
      }
    });
  }

  return candidate;
};

CandidateSchema.statics.toClientArray = function (candidates: ICandidate[]) {
  return candidates.map((candidate) =>
    (this as ICandidateModel).toClientObject(candidate)
  );
};

export default (models.Candidate as ICandidateModel) ||
  model<ICandidateDocument, ICandidateModel>("Candidate", CandidateSchema);
