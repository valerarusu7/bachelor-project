import { BanIcon } from "@heroicons/react/solid";

function TimeCell({ time }) {
  return (
    <div className="flex items-center justify-center ">
      <span>{time !== null ? <p>{time}</p> : <BanIcon className="h-6 w-6 text-gray-500" />}</span>
    </div>
  );
}

export default TimeCell;
