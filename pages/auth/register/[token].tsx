import { GetServerSidePropsContext } from "next";
import { useForm } from "react-hook-form";
import jwt from "jsonwebtoken";
import { IRegisterProps, IRegistrationTokenPayload } from "../../../types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { registerUserSchema } from "../../../helpers/formSchemas";
import FormInput from "../../../components/Landing Page/FormInput";
import PasswordCheckItem from "../../../components/Landing Page/PasswordtCheckItem";
import { BsCheckCircleFill } from "react-icons/bs";

function Register({ email, companyName }: IRegisterProps) {
  const formOptions = { resolver: yupResolver(registerUserSchema) };

  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm(formOptions);
  const router = useRouter();

  const password = watch("password", "");
  const rePassword = watch("rePassword", "");

  const onSubmit = (data: any) => {
    let body = {
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
      rePassword: data.rePassword,
    };

    fetch("/api/account/register", {
      method: "POST",
      body: JSON.stringify(body),
      headers: new Headers({
        Authorization: `Bearer ${router.query.token}`,
      }),
    })
      .then((response) => {
        if (response.ok) {
          router.push("/auth/login");
        } else {
          return response.json().then((text) => {
            throw new Error(text.error);
          });
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <form action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col flex-grow xl:w-1/3 md:w-1/2 sm:w-2/3 p-4 rounded-lg shadow-xl">
        <div className="flex justify-center items-center">
          <p className="font-semibold text-gray-700">
            You are last step from setting up account for {email}
          </p>
        </div>
        <div>
          {/* <p>Account Details</p> */}
          <div>
            <div className="grid xl:grid-cols-2 sm:grid-cols-1 xl:gap-4">
              <FormInput
                type="text"
                id="firstName"
                placeholder="First name"
                errors={errors}
                label="First name"
                {...register("firstName")}
              />
              <FormInput
                type="text"
                id="lastName"
                placeholder="Last name"
                errors={errors}
                label="Last name"
                {...register("lastName")}
              />
            </div>
            <div>
              <div className="grid xl:grid-cols-2 sm:grid-cols-1 xl:gap-4">
                <FormInput
                  type="password"
                  id="password"
                  placeholder="Enter Password"
                  label="Password"
                  {...register("password")}
                />
                <FormInput
                  type="password"
                  id="rePassword"
                  placeholder="Confirm password"
                  label="Confirm password"
                  {...register("rePassword")}
                />
              </div>
              <div>
                {/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[-+_!@#$%^&*., ?])(?=.{8,})/.test(
                  password
                ) && password === rePassword ? (
                  <div className="flex items-center text-green-500 font-semibold">
                    <BsCheckCircleFill className="h-4 w-4 mr-1" />
                    <p>Password requirements met</p>
                  </div>
                ) : (
                  <div>
                    <PasswordCheckItem
                      requirement="The password must contain at least 8 characters"
                      check={password.length > 7}
                      password={password}
                    />
                    <PasswordCheckItem
                      requirement="The password must contain at least 1 lowercase character"
                      check={/^(?=.*[a-z])/.test(password)}
                      password={password}
                    />
                    <PasswordCheckItem
                      requirement="The password must contain at least 1 uppercase character"
                      check={/^(?=.*[A-Z])/.test(password)}
                      password={password}
                    />
                    <PasswordCheckItem
                      requirement="The password must contain at least 1 number"
                      check={/^(?=.*\d)/.test(password)}
                      password={password}
                    />
                    <PasswordCheckItem
                      requirement="The password must contain at least 1 special character"
                      check={/(?=.*[-+_!@#$%^&*., ?])/.test(password)}
                      password={password}
                    />
                    <PasswordCheckItem
                      requirement="The passwords should be equal"
                      check={password === rePassword}
                      password={password}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center p-4">
          {false ? (
            "Loading..."
          ) : (
            <button
              type="submit"
              className="submit bg-blue-300 w-32 cursor-pointer rounded-lg shadow-md p-1 font-semibold"
            >
              Register
            </button>
          )}
        </div>
      </div>
    </form>
  );
}

export default Register;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { ACCOUNT_PRIVATE_KEY } = process.env;

  // @ts-ignore
  const { token } = context.params;

  try {
    const decoded = jwt.verify(
      token,
      ACCOUNT_PRIVATE_KEY as string
    ) as IRegistrationTokenPayload;

    return {
      props: {
        email: decoded.email,
        companyName: decoded.companyName,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      redirect: {
        permanent: false,
        destination: "/registration_error",
      },
    };
  }
};
