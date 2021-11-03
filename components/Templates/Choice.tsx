import { ChangeEventHandler } from "react";

export interface IEmailChoice {
  id: number;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  prefferedChoice: boolean;
  color: string;
}
function EmailChoice({ id, onChange, prefferedChoice, color }: IEmailChoice) {
  return (
    <div className="flex items-center mt-2">
      <div className="w-20">
        <p className="mr-4 text-sm font-medium text-gray-700">{`Choice ${id}`}</p>
      </div>
      <textarea
        className="focus:ring-blue-500 focus:border-blue-500 w-1/2 rounded-md sm:text-sm border-gray-300"
        rows={2}
        onChange={onChange}
      />
      {prefferedChoice ? (
        <div className="ml-4 font-semibold text-gray-700">
          <p>Preffered answer</p>
        </div>
      ) : (
        <button
          className={`bg-gradient-to-tr from-${color}-500 to-${color}-400 ml-4 text-white font-semibold pl-4 pr-4 pt-2 pb-2 rounded-lg shadow-lg hover:opacity-80`}
        >
          Make preffered answer
        </button>
      )}
    </div>
  );
}

export default EmailChoice;
