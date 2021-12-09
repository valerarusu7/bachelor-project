import { object, string } from "yup";

export const websiteSchema = object({
  website: string().required("Website cannot be empty."),
});

export const registrationSchema = object({
  user: object({
    password: string().required("Password cannot be empty."),
    rePassword: string().required("Repassword cannot be empty."),
  }).required("User object cannot be empty."),
  company: object().required("Company object cannot be empty."),
});
