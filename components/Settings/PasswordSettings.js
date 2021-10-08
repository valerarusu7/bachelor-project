import FormLayout from "./FormLayout";
import Separator from "../common/Separator";
import SettingsInput from "./SettingsInput";
import { useForm } from "react-hook-form";
import { useState } from "react";

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

  const onSubmit = async (data) => {
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
        onEdit={() =>
          reset({ currentPassword, newPassword, confirmNewPassword })
        }
      >
        <SettingsInput
          label="Current password"
          type="password"
          placeholder="Current password"
          id="currentPassword"
          errors={errors}
          edit={true}
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
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
          onChange={(e) => setNewPassword(e.target.value)}
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
          onChange={(e) => setConfirmNewPassword(e.target.value)}
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
