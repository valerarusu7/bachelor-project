import { Schema, model, models } from "mongoose";
import { ITaskDocument, IChoiceDocument } from "../types";

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
  templateId: {
    type: Schema.Types.ObjectId,
    required: true,
    unique: true,
    ref: "Template",
  },
});

export default models.Task || model<ITaskDocument>("Task", TaskSchema);
