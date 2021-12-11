import { Schema, model, models } from "mongoose";
import {
  ICandidateVideoInterview,
  ICandidateVideoInterviewAnswer,
  ICandidateVideoInterviewAnswerDocument,
  ICandidateVideoInterviewDocument,
  ICandidateVideoInterviewModel,
} from "../types";

const CandidateVideoInterviewAnswerSchema =
  new Schema<ICandidateVideoInterviewAnswerDocument>(
    {
      order: {
        type: Number,
        required: [true, "Order cannot be empty."],
        min: [0, "Order cannot be negative."],
      },
      answer: {
        type: String,
        required: [true, "Answer cannot be empty."],
      },
    },
    { _id: false }
  );

const CandidateVideoInterviewSchema =
  new Schema<ICandidateVideoInterviewDocument>(
    {
      candidateId: {
        type: Schema.Types.ObjectId,
        required: [true, "Candidate id cannot be empty."],
        unique: true,
      },
      answers: {
        type: [CandidateVideoInterviewAnswerSchema],
        required: [true, "Answers cannot be empty."],
        validate: {
          validator: function (arr: ICandidateVideoInterviewAnswer[]) {
            return arr.length > 10;
          },
          message: "At least 10 answers need to be provided.",
        },
      },
    },
    {
      timestamps: true,
    }
  );

CandidateVideoInterviewSchema.statics.toClientObject = function (
  candidateVideoInterview: ICandidateVideoInterview
) {
  candidateVideoInterview._id = candidateVideoInterview._id.toString();
  candidateVideoInterview.createdAt =
    candidateVideoInterview.createdAt.toString();

  return candidateVideoInterview;
};

CandidateVideoInterviewSchema.pre("validate", function validate(next) {
  var unique = [];

  for (var i = 0, l = this.answers.length; i < l; i++) {
    let prop = this.answers[i].order;

    if (unique.indexOf(prop) > -1) {
      return next(new Error("Order needs to be unique."));
    }

    unique.push(prop);
  }

  next();
});

export default (models.CandidateVideoInterview as ICandidateVideoInterviewModel) ||
  model<ICandidateVideoInterviewDocument, ICandidateVideoInterviewModel>(
    "CandidateVideoInterview",
    CandidateVideoInterviewSchema
  );
