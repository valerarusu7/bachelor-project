import * as Yup from "yup";
import YupPassword from "yup-password";
YupPassword(Yup);

export const registerSchema = Yup.object().shape({
  company_name: Yup.string().required("Please enter the company name"),
  company_website: Yup.string().required("Please enter the company website"),
  first_name: Yup.string().required("Please enter the first name"),
  last_name: Yup.string().required("Please enter the last name"),
  email: Yup.string().email("Invalid email format").required("Please enter the email"),
  password: Yup.string()
    .password()
    .required("Password is required")
    .min(8, "Requirements not met")
    .max(64, "Requirements not met")
    .minLowercase(1, "Requirements not met")
    .minUppercase(1, "Requirements not met")
    .minNumbers(1, "Requirements not met")
    .minSymbols(1, "Requirements not met")
    .typeError(""),
  re_password: Yup.string()
    .required("Confirm the password")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});
