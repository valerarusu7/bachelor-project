import { BanIcon } from "@heroicons/react/solid";

function ScoreCell({ score }) {
  return (
    <div className="flex item-center justify-center">
      <span
        className={`${
          score == 0
            ? "text-gray-500"
            : score <= 35
            ? "text-red-600"
            : score > 35 && score <= 60
            ? "text-yellow-600"
            : score > 60 && score <= 90
            ? "text-green-600"
            : score > 90
            ? "text-green-800"
            : null
        } font-bold`}
      >
        {score != 0 ? <p>{`${score}%`}</p> : <BanIcon className="h-6 w-6" />}
      </span>
    </div>
  );
}

export default ScoreCell;
