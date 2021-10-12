import FormInput from "../components/Landing Page/FormInput";
import { useForm } from "react-hook-form";
import { useState } from "react";

function BecomeACustomer() {
  const [firstName, setFirstName] = useState("asdas");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <form action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
      <p>Become a customer</p>

      <div>
        <p>Company Details</p>
        <div>
          <div>
            Company Name
            <input
              type="text"
              id="company_name"
              placeholder="Company name"
              {...register("company_name", {
                required: "Please enter the company name",
              })}
            />
          </div>
          <div>
            Company Website
            <input
              type="text"
              id="company_website"
              placeholder="Website"
              {...register("company_website", {
                required: "Please enter the company website",
              })}
            />
          </div>
        </div>
      </div>

      <div>
        <p>Account Details</p>
        <div>
          <div>
            First Name
            <FormInput
              type="text"
              id="first_name"
              placeholder="First name"
              errors={errors}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              {...register("first_name", {
                required: "Please enter the first name",
              })}
            />
          </div>
          <div>
            Last Name
            <input
              type="text"
              id="last_name"
              placeholder="Last name"
              errors={errors}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              {...register("last_name", {
                required: "Please enter the last name",
              })}
            />
          </div>
          <div>
            Email
            <input
              type="text"
              id="email"
              placeholder="Email"
              errors={errors}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              {...register("email", {
                required: "Please enter the email",
              })}
            />
          </div>
          <div>
            Password
            <input type="text" placeholder="Enter Password" />
          </div>
          <div>
            Confirm Password
            <input
              type="text"
              id="password"
              placeholder="Confirm password"
              errors={errors}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              {...register("password", {
                required: "Please enter the password",
              })}
            />
          </div>
        </div>
      </div>

      <button type="submit" className="bg-blue-300 w-32 cursor-pointer">
        Create
      </button>
    </form>
  );
}

export default BecomeACustomer;
