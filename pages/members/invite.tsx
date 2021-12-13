import CustomButton from "../../components/common/CustomButton";
import Layout from "../../components/Layout/Layout";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useAppSelector } from "../../store/hooks";
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
  const [isLoading, setIsLoading] = useState(true);
  const [confirm, setConfirm] = useState(true);

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
  // const [state, setState] = useState([]);
  const [emails, setEmails] = useState<string[]>([]);
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");

  function invite() {
    setIsLoading(false);
    setConfirm(true);
    console.log(emails + " sent");
    let body = { emails };
    if (!emails.length) {
      body.emails = [email];
    }
    fetch(`/api/account/emails`, {
      method: "POST",
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.ok) {
          // emails = [];
          setEmails([]);
          setIsLoading(true);
          setConfirm(false);
          setTimeout(() => {
            setConfirm(true);
          }, 10000);
        } else {
          return response.text().then((text) => {
            throw new Error(text);
          });
        }
      })
      .catch((error) => {
        //Handle error
        setIsLoading(true);
        console.log(error);
      });
  }

  // const handleChange = (e: any) => {
  //   let email = e.target.value.split(",");
  //   setEmail(email);
  // };

  const handleChange = (evt: any) => {
    let value = evt.target.value;
    setEmail(value);
  };

  const handleKeyDown = (evt: any) => {
    if (["Enter", "Tab", ","].includes(evt.key)) {
      evt.preventDefault();
      if (isValid(email)) {
        console.log("valid");
        setEmails([email, ...emails]);
        evt.target.value = "";
        setError("");
      } else {
        console.log(error);
      }
    }
  };
  const handleDelete = (toBeRemoved: any) => {
    let newEmails = emails.filter((singleEmail) => singleEmail !== toBeRemoved);
    setEmails(newEmails);
  };

  function isValid(email: string) {
    var error = null;

    if (!isEmail(email)) {
      error = ` Not valid email address.`;
    }

    if (isInList(email)) {
      error = `This email has been already added.`;
    }

    if (error) {
      setError(error);

      return false;
    }

    return true;
  }
  function isEmail(email: string) {
    return /[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/.test(email);
  }

  function isInList(email: string) {
    return emails.includes(email);
  }
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
              Add members to your reqruiting team. To add multiple members press
              enter after typing the email
            </span>

            <div className="flex flex-row w-full mt-4">
              <form
                className="flex flex-row w-full mt-4"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="flex flex-row w-full mt-4">
                  <input
                    id="member"
                    // onChange={(e: any) => handleChange(e)}
                    type="text"
                    multiple
                    placeholder="Enter Email Address"
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    // {...register("email")}
                    className={`rounded-md flex-grow border border-gray-400 focus:border-blue-400 mr-4 ${
                      errors.email ? "is-invalid" : ""
                    }`}
                  />
                </div>
                <div className="mt-4">
                  <CustomButton
                    onClick={() => invite()}
                    color="blue"
                    type="submit"
                  >
                    Invite Members
                  </CustomButton>
                </div>{" "}
              </form>
            </div>
          </div>
          <p className="items-center font-medium tracking-wide text-red-500 text-s mt-1 ml-2">
            {error}
          </p>
          {emails.map((email) => (
            <div
              className="invite-emails bg-gray-200 text-base rounded-3xl h-14 align-center p-4 m-2 inline-flex text-sm items-center"
              key={email}
            >
              <span>{email}</span>
              <button
                type="button"
                className="bg-white w-5 h-5 cursor-pointer ml-2 font-bold p-0 leading-none flex items-center justify-center rounded-3xl "
                onClick={() => handleDelete(email)}
              >
                &times;
              </button>
            </div>
          ))}
          <div className={isLoading ? "invisible" : undefined}>
            <div className="flex justify-center items-center">
              <div className="animate-spin  m-8 rounded-full h-16 w-16 border-b-2 border-blue-400"></div>
            </div>
          </div>
          <div className={confirm ? "invisible" : undefined}>
            <div className="bg-blue-100 rounded-md p-3 flex ">
              <svg
                className="stroke-2 stroke-current text-blue-600 h-8 w-8 mr-2 flex-shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M0 0h24v24H0z" stroke="none" />
                <circle cx="12" cy="12" r="9" />
                <path d="M9 12l2 2 4-4" />
              </svg>

              <div className="text-blue-700">
                <div className="font-bold text-xl">
                  Your invite has been sent!
                </div>
                Note that the invite link will expire in 1 day.
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Invite;
