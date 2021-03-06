import { Schema, model, models } from "mongoose";
import { IPosition, IPositionDocument, IPositionModel } from "../types";

const JobPositionSchema = new Schema<IPositionDocument>({
  _id: String,
  name: String,
  openings: Number,
  targetHireDate: Date,
  status: String,
  requestCompletedDate: Date,
  location: String,
  profile: String,
  supervisoryOrganization: String,
  recruitingStartDate: Date,
  companyId: {
    type: Schema.Types.ObjectId,
    required: [true, "Company id cannot be empty."],
    ref: "Company",
  },
});

JobPositionSchema.statics.toClientArray = function (positions: IPosition[]) {
  return positions.map((position) => {
    // @ts-ignore
    position.recruitingStartDate = position.recruitingStartDate.toISOString();
    position.location = position.location ? position.location : "";

    return position;
  });
};

export default (models.JobPosition as IPositionModel) ||
  model<IPositionDocument, IPositionModel>("JobPosition", JobPositionSchema);
