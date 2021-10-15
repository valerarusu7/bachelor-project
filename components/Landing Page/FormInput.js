import { forwardRef } from "react";

function FormInput({ type, id, placeholder, errors, onChange, label, ...rest }, ref) {
  return (
    <div className="">
      <label htmlFor="company-website" className="block text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        {...rest}
        ref={ref}
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        errors={errors}
        onChange={onChange}
        className="focus:ring-blue-500 focus:border-blue-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
      />
      <div className="h-4">
        {errors
          ? errors[id] && (
              <div className=" text-xs font-semibold text-red-500 ">{errors[id] !== "password" ? errors[id].message : null}</div>
            )
          : null}
      </div>
    </div>
  );
}

export default forwardRef(FormInput);
