import { Schema, model, models } from "mongoose";
import {
  ICandidateCommentDocument,
  ICandidateCommentModel,
  ICandidateComment,
} from "../types";

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

CandidateCommentSchema.statics.toClientArray = function (
  candidateComments: ICandidateComment[]
) {
  return candidateComments.map((candidateComment) => {
    candidateComment._id = candidateComment._id.toString();
    candidateComment.createdAt = candidateComment.createdAt.toString();
    //@ts-ignore
    if (candidateComment.userId._id) {
      //@ts-ignore
      candidateComment.userId._id = candidateComment.userId._id.toString();
    }
    return candidateComment;
  });
};

export default (models.CandidateComment as ICandidateCommentModel) ||
  model<ICandidateCommentDocument, ICandidateCommentModel>(
    "CandidateComment",
    CandidateCommentSchema
  );
