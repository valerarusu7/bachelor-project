import { Schema, model, models } from "mongoose";
import { ITemplateDocument, ITaskDocument, IChoiceDocument } from "../types";

const ChoiceSchema = new Schema<IChoiceDocument>({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
  },
  value: {
    type: String,
    required: true,
  },
  isCorrect: {
    type: Boolean,
    required: true,
  },
});

const TaskSchema = new Schema<ITaskDocument>({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
  },
  question: {
    type: String,
    required: true,
    maxLength: [256, "Description cannot be more than 256 characters."],
  },
  order: {
    type: Number,
    required: true,
  },
  taskType: {
    type: String,
    required: true,
  },
  choices: [ChoiceSchema],
});

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
    tasks: [TaskSchema],
    companyId: {
      type: Schema.Types.ObjectId,
      required: true,
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
