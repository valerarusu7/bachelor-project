import { forwardRef } from "react";

function FormInput(
  { type, id, placeholder, errors, value, onChange, ...rest },
  ref
) {
  return (
    <div>
      <input
        {...rest}
        ref={ref}
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        errors={errors}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default forwardRef(FormInput);
