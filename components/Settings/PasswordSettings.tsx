import FormLayout from "./FormLayout";
import Separator from "../common/Separator";
import SettingsInput from "./SettingsInput";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { IPasswordFormValues } from "../../types";

function PasswordSettings() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit: SubmitHandler<IPasswordFormValues> = async (data) => {
    const fields = data;
    console.log(fields);
  };

  return (
    <div>
      <FormLayout
        header="Password"
        helpText="Use a strong password to protect your account."
        onSubmit={handleSubmit(onSubmit)}
        edit={true}
        onEdit={() => reset({ currentPassword, newPassword, confirmNewPassword })}
      >
        <SettingsInput
          label="Current password"
          type="password"
          placeholder="Current password"
          id="currentPassword"
          errors={errors}
          edit={true}
          value={currentPassword}
          {...register("currentPassword", {
            required: "Please enter the current password",
          })}
        />
        <SettingsInput
          label="New password"
          type="password"
          placeholder="New password"
          id="newPassword"
          errors={errors}
          edit={true}
          value={newPassword}
          {...register("newPassword", {
            required: "Please enter the password",
          })}
        />
        <SettingsInput
          label="Confirm password"
          type="password"
          placeholder="Confirm password"
          id="confirmNewPassword"
          errors={errors}
          edit={true}
          value={confirmNewPassword}
          {...register("confirmNewPassword", {
            required: "Please enter the password",
          })}
        />
      </FormLayout>
      <Separator />
    </div>
  );
}

export default PasswordSettings;
