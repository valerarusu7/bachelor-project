import { Schema, model, models } from "mongoose";
import { ICompanyDocument } from "../types";

const CompanySchema = new Schema<ICompanyDocument>({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
    maxlength: [64, "Name cannot be more than 64 characters."],
  },
  website: {
    type: String,
    maxlength: [2000, "website cannot be more than 2000 characters."],
  },
});

export default models.Company ||
  model<ICompanyDocument>("Company", CompanySchema);
