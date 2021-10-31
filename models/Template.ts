import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TemplateSchema = new Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    auto: true,
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
    unique: true,
    ref: "JobPosition",
  },
});

export default mongoose.models.Template ||
  mongoose.model("Template", TemplateSchema);
