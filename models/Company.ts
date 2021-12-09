import { Schema, model, models } from "mongoose";
import { ICompanyDocument } from "../types";

const CompanySchema = new Schema<ICompanyDocument>({
  name: {
    type: String,
    required: [true, "Company name cannot be empty."],
    unique: true,
    maxlength: [64, "Company name cannot be more than 64 characters."],
  },
  website: {
    type: String,
    maxlength: [2000, "Company website cannot be more than 2000 characters."],
  },
});

export default models.Company ||
  model<ICompanyDocument>("Company", CompanySchema);
