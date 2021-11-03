import { Schema, Types, model, models } from "mongoose";
import { ICompany } from "../types";

const CompanySchema = new Schema<ICompany>({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
  },
  name: {
    type: String,
    required: true,
    maxlength: [64, "Name cannot be more than 64 characters."],
  },
  website: {
    type: String,
    maxlength: [2000, "website cannot be more than 2000 characters."],
  },
});

export default models.Company || model<ICompany>("Company", CompanySchema);
