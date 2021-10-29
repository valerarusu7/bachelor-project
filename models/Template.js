import mongoose from "mongoose";
import MUUID from "uuid-mongodb";

const TemplateSchema = new mongoose.Schema({
  _id: {
    type: "object",
    value: { type: "Buffer" },
    default: () => MUUID.v4(),
  },
  name: {
    type: String,
    required: true,
    maxlength: [64, "Name cannot be more than 64 characters."],
  },
  description: {
    type: String,
    maxLength: [256, "Description cannot be more than 256 characters."],
  },
  created: Date,
  jobId: {
    type: String,
    required: true,
  },
});

module.exports =
  mongoose.models.Template || mongoose.model("Template", TemplateSchema);
