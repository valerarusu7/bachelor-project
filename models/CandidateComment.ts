import { Schema, model, models } from "mongoose";
import { ICandidateCommentDocument } from "../types";

const CandidateCommentSchema = new Schema<ICandidateCommentDocument>(
  {
    comment: {
      type: String,
      required: [true, "Comment cannot be empty."],
      maxlength: [512, "Comment cannot be more than 512 characters."],
    },
    candidateId: {
      type: Schema.Types.ObjectId,
      required: [true, "Candidate id cannot be empty."],
      ref: "Candidate",
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: [true, "User id cannot be empty."],
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default models.CandidateComment ||
  model<ICandidateCommentDocument>("CandidateComment", CandidateCommentSchema);
