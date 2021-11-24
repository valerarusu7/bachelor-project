import CustomButton from "../../components/common/CustomButton";
import Layout from "../../components/Layout/Layout";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import React, { useState } from "react";
import * as Yup from "yup";

type UserSubmitForm = {
  fullname: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
};

const Invite: React.FC = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
  });
  const [inputs, setInputs] = React.useState({});

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserSubmitForm>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data: UserSubmitForm) => {
    console.log(JSON.stringify(data, null, 2));
  };
  const [state, setState] = useState([]);

  return (
    <Layout header="Invite New Member">
      <div className="m-2">
        <div className="container mx-auto bg-white py-24 px-12 rounded-xl shadow-md">
          <div className="flex flex-col items-center w-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="text-gray-400 h-16 w-16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            <span className="text-xl text-gray-800">Assemble Team</span>
            <span className="text-gray-600">
              Add members to your reqruiting team
            </span>

            <div className="flex flex-row w-full mt-4">
              <form
                className="flex flex-row w-full mt-4"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="flex flex-row w-full mt-4">
                  <input
                    type="text"
                    multiple
                    placeholder="Enter Email Address"
                    {...register("email")}
                    className={`rounded-md flex-grow border border-gray-400 focus:border-blue-400 mr-4 ${
                      errors.email ? "is-invalid" : ""
                    }`}
                  />
                </div>
                <div className="mt-4">
                  <CustomButton color="blue" type="submit">
                    Invite Members
                  </CustomButton>
                </div>{" "}
              </form>
            </div>
          </div>
          <div className="items-center font-medium tracking-wide text-red-500 text-s mt-1 ml-2">
            {errors.email?.message}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Invite;
