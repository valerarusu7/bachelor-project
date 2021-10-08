import { forwardRef } from "react";

const SettingsInput = ({ label, type, id, placeholder, value, onChange, errors, edit, ...rest }, ref) => {
  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-3 sm:col-span-2">
        <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        {edit == true ? (
          <div className="mt-1 flex rounded-md shadow-sm">
            <input
              {...rest}
              ref={ref}
              type={type}
              name={id}
              id={id}
              defaultValue={value}
              className="focus:ring-blue-500 focus:border-blue-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
              placeholder={placeholder}
              aria-describedby={id}
              onChange={onChange}
            />
          </div>
        ) : (
          <p className="font-normal text-sm">{value}</p>
        )}
        <div>{errors[id] && <div className="text-sm text-red-500 ">{errors[id].message}</div>}</div>
      </div>
    </div>
  );
};

export default forwardRef(SettingsInput);
