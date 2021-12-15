import { object, string } from "yup";

export const registrationSchema = object({
  email: string().email().required("Email cannot be empty."),
  companyId: string().required("CompanyId cannot be empty."),
  companyName: string().required("Company name cannot be empty."),
});
