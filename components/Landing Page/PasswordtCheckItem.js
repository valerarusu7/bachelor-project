import { BsCheckCircleFill, BsXCircleFill } from "react-icons/bs";
import { GoPrimitiveDot } from "react-icons/go";

function PasswordCheckItem({ requirement, check, password }) {
  return (
    <div
      className={`${
        password.length === 0
          ? "text-gray-600"
          : password.length > 0 && check
          ? "text-green-500"
          : password.length > 0 && !check
          ? "text-red-500"
          : null
      } flex items-center`}
    >
      {password.length === 0 ? (
        <GoPrimitiveDot className="h-3 w-3 mr-1" />
      ) : password.length > 0 && check ? (
        <BsCheckCircleFill className="h-3 w-3 mr-1" />
      ) : password.length > 0 && !check ? (
        <BsXCircleFill className="h-3 w-3 mr-1" />
      ) : null}
      <p className="text-sm font-semibold">{requirement} </p>
    </div>
  );
}

export default PasswordCheckItem;
