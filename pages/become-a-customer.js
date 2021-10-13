import FormInput from "../components/Landing Page/FormInput";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useState } from "react";

function BecomeACustomer() {
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    const user = {
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      password: data.password,
    };
    const company = { name: data.company_name, website: data.company_website };
    const response = { company, user };
    console.log(response);
    router.replace("/auth/login");
  };

  return (
    <form action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
      <p>Become a customer</p>
      <div>
        <p>Company Details</p>
        <div>
          <div>
            Company Name
            <FormInput
              type="text"
              id="company_name"
              placeholder="Company name"
              errors={errors}
              {...register("company_name", {
                required: "Please enter the company name",
              })}
            />
          </div>
          <div>
            Company Website
            <FormInput
              type="text"
              id="company_website"
              placeholder="Website"
              errors={errors}
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
              {...register("first_name", {
                required: "Please enter the first name",
              })}
            />
          </div>
          <div>
            Last Name
            <FormInput
              type="text"
              id="last_name"
              placeholder="Last name"
              errors={errors}
              {...register("last_name", {
                required: "Please enter the last name",
              })}
            />
          </div>
          <div>
            Email
            <FormInput
              type="text"
              id="email"
              placeholder="Email"
              errors={errors}
              {...register("email", {
                required: "Please enter the email",
              })}
            />
          </div>
          <div>
            Password
            <FormInput type="text" placeholder="Enter Password" />
          </div>
          <div>
            Confirm Password
            <FormInput
              type="text"
              id="password"
              placeholder="Confirm password"
              errors={errors}
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
