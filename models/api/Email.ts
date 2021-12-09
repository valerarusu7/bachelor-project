import { array, object, string } from "yup";

export const emailsSchema = object({
  emails: array()
    .of(string().email().min(1))
    .required("Emails cannot be empty."),
});
