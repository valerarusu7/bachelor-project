import { stringAvatar } from "../../../../helpers/stringAvatar";

function NameCell({ firstName, lastName }) {
  return (
    <div className="flex items-center">
      <div className="mr-2">
        <div className="w-8 h-8 border-2 rounded-full p-2 flex items-center justify-center border-blue-400 bg-blue-200 text-blue-500">
          <p className="font-semibold text-sm">{stringAvatar(`${firstName} ${lastName}`)}</p>
        </div>
      </div>
      <span>{`${firstName} ${lastName}`}</span>
    </div>
  );
}

export default NameCell;
