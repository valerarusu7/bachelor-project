import FormInput from "../../components/Landing Page/FormInput";
// import { register as registerCompanyUser } from "../store/reducers/authSlice";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerCompanySchema } from "../../helpers/formSchemas";
import PasswordCheckItem from "../../components/Landing Page/PasswordtCheckItem";
import { BsCheckCircleFill } from "react-icons/bs";

function BecomeACustomer() {
  const formOptions = { resolver: yupResolver(registerCompanySchema) };

  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm(formOptions);
  const router = useRouter();

  // const { isAuthenticated, register_success, loading } = useSelector((state) => state.auth);
  // const dispatch = useDispatch();

  const password = watch("password", "");
  const rePassword = watch("rePassword", "");

  const onSubmit = (data: any) => {
    console.log("HEYY");
    let body = {
      user: {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
        rePassword: data.rePassword,
      },
      company: {
        name: data.companyName,
        website: data.companyWebsite,
      },
    };

    fetch("/api/companies", {
      method: "POST",
      body: JSON.stringify(body),
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

  // if (typeof window !== "undefined" && isAuthenticated) router.push("/dashboard");

  // if (register_success) router.push("/login");

  return (
    <form action="#" method="POST" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col flex-grow xl:w-1/3 md:w-1/2 sm:w-2/3 p-4 rounded-lg shadow-xl">
        <div className="flex justify-center items-center">
          <p className="font-semibold text-gray-700 text-xl">Register</p>
        </div>
        <div className="w-full h-0.5 bg-gray-200 mt-2 mb-2" />
        <div>
          {/* <p>Company Details</p> */}
          <div className="grid xl:grid-cols-2 sm:grid-cols-1 xl:gap-4">
            <FormInput
              type="text"
              id="companyName"
              placeholder="Company name"
              errors={errors}
              label="Company name"
              {...register("companyName")}
            />
            <FormInput
              type="text"
              id="companyWebsite"
              placeholder="Website"
              errors={errors}
              label="Website"
              {...register("companyWebsite")}
            />
          </div>
        </div>
        <div className="w-full h-0.5 bg-gray-200 mt-2 mb-2" />

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
              <FormInput
                type="text"
                id="email"
                placeholder="Email"
                errors={errors}
                label="Email"
                {...register("email")}
              />
              <div className="grid xl:grid-cols-2 sm:grid-cols-1 xl:gap-4">
                <FormInput
                  type="password"
                  id="password"
                  placeholder="Enter Password"
                  label="Password"
                  // onChange={(e) => console.log(e)}
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

export default BecomeACustomer;
