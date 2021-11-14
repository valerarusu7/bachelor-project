import { IUserDocument } from "../types";
import { Schema, model, models } from "mongoose";

const CompanySchema = new Schema<IUserDocument>({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
  },
  firstName: {
    type: String,
    required: true,
    maxlength: [64, "First name cannot be more than 64 characters."],
  },
  lastName: {
    type: String,
    required: true,
    maxlength: [64, "Last name cannot be more than 64 characters."],
  },
});

export default models.Company || model<IUserDocument>("Company", CompanySchema);