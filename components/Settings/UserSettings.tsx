import FormLayout from "./FormLayout";
import Separator from "../common/Separator";
import SettingsInput from "./SettingsInput";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { IUserProps, IUserFormValues } from "../../types";

function UserSettings({ user }: IUserProps) {
  const [edit, setEdit] = useState(false);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [birthday, setBirthday] = useState(user.birthday);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit: SubmitHandler<IUserFormValues> = async (data) => {
    const fields = data;
    console.log(fields);
    onEdit();
  };

  const onEdit = () => {
    if (edit) {
      reset({ firstName, lastName, email, birthday });
    }
    setEdit(!edit);
  };

  return (
    <div>
      <FormLayout
        header="Personal Information"
        helpText="Use a permanent address where you can receive mail."
        edit={edit}
        onEdit={() => onEdit()}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Photo
          </label>
          <div className="mt-1 flex items-center">
            <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
              <svg
                className="h-full w-full text-gray-300"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </span>
            {edit == true ? (
              <button
                type="button"
                className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Change
              </button>
            ) : null}
          </div>
        </div>
        <SettingsInput
          label="First name"
          type="text"
          id="firstName"
          placeholder="Valeriu"
          errors={errors}
          edit={edit}
          value={firstName}
          {...register("firstName", {
            required: "Please enter the first name",
          })}
        />
        <SettingsInput
          label="Last name"
          id="lastName"
          type="text"
          placeholder="Rusu"
          errors={errors}
          edit={edit}
          value={lastName}
          {...register("lastName", { required: "Please enter the last name" })}
        />
        <SettingsInput
          label="Email"
          id="email"
          type="email"
          placeholder="valeriu.rusu111@gmail.com"
          errors={errors}
          edit={edit}
          value={email}
          {...register("email", { required: "Please enter the email" })}
        />
        <SettingsInput
          label="Birthday"
          id="birthday"
          type="date"
          errors={errors}
          placeholder=""
          edit={edit}
          value={birthday}
          {...register("birthday", {
            required: "Please select the birthday",
            valueAsDate: true,
          })}
        />
      </FormLayout>
      <Separator />
    </div>
  );
}

export default UserSettings;
