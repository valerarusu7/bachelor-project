import FormLayout from "./FormLayout";
import Separator from "../common/Separator";
import SettingsInput from "./SettingsInput";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { ICompanyFormValues, ICompanySettingsProps } from "../../types";

function CompanySettings({ company }: ICompanySettingsProps) {
  const [edit, setEdit] = useState(false);
  const [companyName, setCompanyName] = useState(company.name);
  const [companyWebsite, setCompanyWebsite] = useState(company.website);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit: SubmitHandler<ICompanyFormValues> = async (data) => {
    const fields = data;
    console.log(fields);
    onEdit();
  };

  const onEdit = () => {
    if (edit) {
      reset({ companyName, companyWebsite });
    }

    setEdit(!edit);
  };

  return (
    <div>
      <FormLayout
        header="Company"
        helpText="This information will be displayed publicly so be careful what you share."
        edit={edit}
        onEdit={() => onEdit()}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Company logo
          </label>
          <div className="mt-1 flex items-center">
            <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100"></span>
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
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-3 sm:col-span-2">
            <label
              htmlFor="company-website"
              className="block text-sm font-medium text-gray-700"
            >
              Website
            </label>
            {edit == true ? (
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  http://
                </span>

                <input
                  type="text"
                  name="company-website"
                  id="company-website"
                  defaultValue={companyWebsite}
                  className="focus:ring-blue-500 focus:border-blue-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                  placeholder="www.example.com"
                />
              </div>
            ) : (
              <a href={`http://${companyWebsite}`} target="_blank">
                {companyWebsite}
              </a>
            )}
          </div>
        </div>
        <SettingsInput
          label="Company name"
          type="text"
          placeholder="Stibo"
          id="company"
          errors={errors}
          edit={edit}
          value={companyName}
          {...register("company", {
            required: "Please enter the company name",
          })}
        />
      </FormLayout>
      <Separator />
    </div>
  );
}

export default CompanySettings;
