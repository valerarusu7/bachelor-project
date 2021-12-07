import { Schema, model, models } from "mongoose";
import {
  ICandidateVideoInterviewAnswerDocument,
  ICandidateVideoInterviewDocument,
} from "../types";

const CandidateVideoInterviewAnswerSchema =
  new Schema<ICandidateVideoInterviewAnswerDocument>(
    {
      order: {
        type: Number,
        required: true,
      },
      answer: {
        type: String,
        required: true,
      },
    },
    { _id: false }
  );

const CandidateVideoInterviewSchema =
  new Schema<ICandidateVideoInterviewDocument>({
    _id: {
      type: Schema.Types.ObjectId,
      auto: true,
    },
    candidateId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    answers: [CandidateVideoInterviewAnswerSchema],
  });

CandidateVideoInterviewSchema.pre("validate", function validate(next) {
  var unique = [];

  for (var i = 0, l = this.answers.length; i < l; i++) {
    let prop = this.answers[i].order;

    if (unique.indexOf(prop) > -1) {
      return next(new Error("Id needs to be unique."));
    }

    unique.push(prop);
  }

  next();
});

export default models.CandidateVideoInterview ||
  model<ICandidateVideoInterviewDocument>(
    "CandidateVideoInterview",
    CandidateVideoInterviewSchema
  );
