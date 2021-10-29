import mongoose from "mongoose";
import MUUID from "uuid-mongodb";

const CompanySchema = new mongoose.Schema({
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
});

module.exports =
  mongoose.models.Company || mongoose.model("Company", CompanySchema);
