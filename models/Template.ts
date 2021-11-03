import { Schema, model, models } from "mongoose";
import { ITemplateDocument } from "../types";

const TemplateSchema = new Schema<ITemplateDocument>(
  {
    _id: {
      type: Schema.Types.ObjectId,
      auto: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      maxLength: [256, "Description cannot be more than 256 characters."],
    },
    companyId: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: "Company",
    },
    jobId: {
      type: String,
      required: true,
      unique: true,
      ref: "JobPosition",
    },
  },
  {
    timestamps: true,
  }
);

export default models.Template ||
  model<ITemplateDocument>("Template", TemplateSchema);
