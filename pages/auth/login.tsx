import * as Yup from "yup";
import Canvas from "../../components/Landing Page/canvas/canvas";
import FormInput from "../../components/Landing Page/FormInput";
import NavBar from "../../components/Landing Page/navbar";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import { setUser } from "../../store/reducers/authSlice";
import { useDispatch } from "react-redux";

type UserSubmitForm = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
  });
  const router = useRouter();
  const [error, setError] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserSubmitForm>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: UserSubmitForm) => {
    setError("");
    fetch("/api/account/login", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            dispatch(setUser(data.user));
          });
          router.push("/dashboard");
        } else {
          return response.text().then((text) => {
            setError("Email or password is incorrect.");
            throw new Error(text);
          });
        }
      })
      .catch((error) => {
        //Handle error
        console.log(error);
      });
  };

  return (
    <div className="h-screen w-full bg-white mx-auto text-center overflow-hidden">
      <NavBar />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"
      />
      <div className="flex">
        <div className="flex-col flex ml-auto mr-auto items-center w-full lg:w-2/3 md:w-3/5">
          <h1 className="font-bold text-2xl my-10 mt-16 text-black"> Login </h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-2 flex flex-col lg:w-1/2 w-8/12"
          >
            <div className="flex flex-wrap items-stretch w-auto mb-4 relative h-15 bg-white items-center rounded mb-6 pr-10">
              <div className="flex -mr-px justify-center w-15 p-4">
                <span className="flex items-center leading-normal bg-white px-3 border-0 rounded rounded-r-none text-2xl text-gray-600">
                  <i className="fas fa-user-circle"></i>
                </span>
              </div>
              <input
                type="text"
                className="rounded-2xl flex-shrink flex-grow flex-auto leading-normal w-px flex-1 border-10 h-10 border-grey-light px-3 self-center relative  font-roboto text-xl outline-none"
                placeholder="Email"
                {...register("email")}
              />
            </div>
            <div className="flex flex-wrap items-stretch w-auto mb-4 relative h-15 bg-white items-center rounded mb-6 pr-10">
              <div className="flex -mr-px justify-center w-15 p-4">
                <span className="flex items-center leading-normal bg-white rounded rounded-r-none text-xl px-3 whitespace-no-wrap text-gray-600">
                  <i className="fas fa-lock"></i>
                </span>
              </div>
              <input
                type="password"
                className="rounded-2xl flex-shrink flex-grow flex-auto leading-normal w-px flex-1 border-10 h-10 border-grey-light px-3 self-center relative  font-roboto text-xl outline-none"
                placeholder="Password"
                {...register("password")}
              />
            </div>
            <p className="items-center font-medium tracking-wide text-red-500 text-s mt-1 ml-2">
              {error}
            </p>
            <div className="w-full relative h-15 bg-white items-center rounded mb-4">
              {false ? (
                "Loading..."
              ) : (
                <button
                  type="submit"
                  className="w-2/3 bg-blue-300 py-4 text-center px-17 md:px-12 md:py-4 text-white rounded-2xl leading-tight text-xl md:text-base font-sans mt-4 mb-20"
                >
                  Login
                </button>
              )}{" "}
            </div>
          </form>
        </div>
      </div>
      <Canvas />
    </div>
  );
};

export default Login;
