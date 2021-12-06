import { IUser, IUserDocument, IUserModel } from "../types";
import { Schema, model, models } from "mongoose";
import bcryptjs from "bcryptjs";

const UserSchema = new Schema<IUserDocument>({
  _id: {
    type: Schema.Types.ObjectId,
    auto: true,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email cannot be empty."],
    maxlength: [64, "Email cannot be more than 64 characters."],
  },
  firstName: {
    type: String,
    required: [true, "First name cannot be empty."],
    maxlength: [64, "First name cannot be more than 64 characters."],
  },
  lastName: {
    type: String,
    required: [true, "Last name cannot be empty."],
    maxlength: [64, "Last name cannot be more than 64 characters."],
  },
  birthday: {
    type: Date,
    required: [true, "Birthday cannot be empty."],
  },
  password: {
    type: String,
    required: [true, "Password cannot be empty."],
    minlength: [12, "Password needs to be at least 12 characters."],
    maxlength: [128, "Password cannot be more than 128 characters."],
  },
  role: {
    type: String,
    required: [true, "Role cannot be empty."],
    default: "read",
  },
  companyId: {
    type: Schema.Types.ObjectId,
    required: [true, "Company id cannot be empty."],
    ref: "Company",
  },
});

UserSchema.pre("save", async function (this: IUserDocument) {
  if (!this.isModified("password")) {
    return;
  }

  const salt = await bcryptjs.genSalt();
  const hash = await bcryptjs.hashSync(this.password, salt);

  this.password = hash;
});

UserSchema.methods.comparePassword = async function (
  userPassword: string
): Promise<boolean> {
  const user = this as IUserDocument;

  return bcryptjs
    .compare(userPassword, user.password)
    .catch((error: Error) => false);
};

UserSchema.statics.toClientObject = function (user: IUser) {
  user._id = user._id.toString();
  if (user.birthday) {
    user.birthday = user.birthday.toString();
  }

  return user;
};

UserSchema.statics.toClientArray = function (users: IUser[]) {
  return users.map((user) => (this as IUserModel).toClientObject(user));
};

export default (models.User as IUserModel) ||
  model<IUserDocument, IUserModel>("User", UserSchema);
