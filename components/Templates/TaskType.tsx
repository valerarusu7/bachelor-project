import { ITaskType } from "../../types";

function TaskType({ Icon, taskName, color, disabled, onClick }: ITaskType) {
  return (
    <div
      className={`group flex flex-col justify-center items-center w-1/6 ${disabled ? "cursor-not-allowed" : "cursor-pointer "}`}
      onClick={onClick}
    >
      <button
        className={`${disabled ? "cursor-not-allowed" : "cursor-pointer group-hover:opacity-70"} ${
          color === "red"
            ? "from-red-700 to-red-400"
            : color === "green"
            ? "from-green-700 to-green-400"
            : color === "blue"
            ? "from-blue-700 to-blue-400"
            : color === "purple"
            ? "from-purple-700 to-purple-400"
            : color === "orange"
            ? "from-orange-700 to-orange-400"
            : color === "sky"
            ? "from-sky-700 to-sky-400"
            : color === "yellow"
            ? "from-yellow-700 to-yellow-400"
            : null
        }  rounded-full bg-gradient-to-tr  h-12 w-12 flex justify-center items-center disabled:opacity-50 transition transform duration-400 ease-in-out`}
        disabled={disabled}
      >
        {Icon && <Icon className="text-white h-8 w-8" />}
      </button>
      <p
        className={`${
          disabled ? "opacity-0" : "opacity-100"
        } font-semibold transition transform duration-500 ease-in-out group-hover:opacity-70`}
      >
        {disabled ? "In development" : taskName}
      </p>
    </div>
  );
}

export default TaskType;
