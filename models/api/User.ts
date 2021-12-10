import { object, string } from "yup";

export const roleSchema = object({
  role: string().required("Role cannot be empty."),
});

export const loginSchema = object({
  email: string().email().required("Email cannot be empty."),
  password: string().required("Password cannot be empty."),
});

export const registrationSchema = object({
  password: string().required("Password cannot be empty."),
  rePassword: string().required("Repassword cannot be empty."),
});

export const changePasswordSchema = object({
  oldPassword: string().required("Old password cannot be empty."),
  newPassword: string().required("New password cannot be empty."),
  reNewPassword: string().required("Re new password cannot be empty."),
});
