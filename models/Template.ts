import { IChoiceDocument, ITaskDocument, ITemplateDocument } from "../types";
import { Schema, model, models } from "mongoose";

const ChoiceSchema = new Schema<IChoiceDocument>({
  _id: {
    type: Number,
    min: 0,
  },
  value: {
    type: String,
    required: [true, "Choice cannot be empty."],
  },
  isCorrect: {
    type: Boolean,
    required: [true, "Choice must be selected as correct or not correct."],
  },
});

const TaskSchema = new Schema<ITaskDocument>({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
  },
  question: {
    type: String,
    required: [true, "Question cannot be empty."],
    maxLength: [2048, "Question cannot be more than 2048 characters."],
  },
  order: {
    type: Number,
    required: true,
    min: [0, "Order cannot be negative integer"],
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
      required: [true, "Name cannot be empty."],
    },
    description: {
      type: String,
      maxLength: [256, "Description cannot be more than 256 characters."],
    },
    tasks: [TaskSchema],
    companyId: {
      type: Schema.Types.ObjectId,
      required: [true, "Company id cannot be empty."],
      ref: "Company",
    },
    jobId: {
      type: String,
      required: [true, "Job id cannot be empty."],
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
