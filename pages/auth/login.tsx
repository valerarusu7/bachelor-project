import NavBar from "../../components/Landing Page/navbar";
import Canvas from "../../components/Landing Page/canvas/canvas";
import FormInput from "../../components/Landing Page/FormInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import React from "react";
import { useRouter } from "next/router";
import * as Yup from "yup";

type UserSubmitForm = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
  });
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserSubmitForm>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: UserSubmitForm) => {
    fetch("/api/account/login", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(async (response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.text().then((text) => {
            throw new Error(text);
          });
        }
      })
      .then((response) => {
        router.push("/positions");
      })
      .catch((error) => {
        //Handle error
      });
  };

  return (
    <div className="h-screen w-full bg-white mx-auto text-center">
      <NavBar></NavBar>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col flex-grow xl:w-1/3 md:w-1/2 sm:w-2/3 p-4 rounded-lg shadow-xl">
          <div className="flex justify-center items-center">
            <p className="font-semibold text-gray-700 text-xl">Login</p>
          </div>
          <div>{/* <p>Company Details</p> */}</div>
          <div className="w-full h-0.5 bg-gray-200 mt-2 mb-2" />

          <div>
            {/* <p>Account Details</p> */}
            <FormInput
              type="text"
              id="email"
              placeholder="Enter Email"
              label="Email"
              className={`rounded-md flex-grow border border-gray-400 focus:border-blue-400 mr-4 `}
              // onChange={(e) => onChangeEmail(e)}
              {...register("email")}
            />
            <div className="text-justify font-medium tracking-wide text-red-500 text-xs">
              {errors.email?.message}
            </div>
            <div>
              <FormInput
                type="password"
                id="password"
                placeholder="Enter Password"
                label="Password"
                {...register("password")}
              />
            </div>
          </div>
          <div className="flex justify-center items-center p-4">
            {false ? (
              "Loading..."
            ) : (
              <button
                type="submit"
                className="bg-blue-300 w-32 cursor-pointer rounded-lg shadow-md p-1 font-semibold"
              >
                Login
              </button>
            )}{" "}
          </div>
        </div>
      </form>
      <Canvas />
    </div>
  );
};

export default Login;
