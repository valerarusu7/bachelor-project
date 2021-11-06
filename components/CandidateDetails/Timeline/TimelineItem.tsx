import { ITimelineItem } from "../../../types";
import { stringAvatar } from "../../../helpers/stringAvatar";

function TimelineItem({ Icon, helpText, position, date, color, comment, candidate, time, show }: ITimelineItem) {
  return (
    <div>
      {comment !== true ? (
        <div className="flex mb-1 ">
          <div className="w-14 flex flex-col justify-center items-center ">
            <div> {Icon && <Icon className={`h-6 w-6 text-${color}-500`} />}</div>
            {show !== true ? (
              <div className="h-6 w-12 flex items-center justify-center mt-1">
                <div className="w-0.5 h-full bg-gray-200 rounded-full " />
              </div>
            ) : null}
          </div>
          <div className="flex justify-between w-full ml-1  ">
            <div className="text-sm text-gray-500 flex">
              {`${helpText}`} <p className="ml-1 font-bold text-gray-700">{`${position}`}</p>
            </div>
            <div>
              <p className="text-sm  font-semibold text-gray-500 pr-1">{date}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex mb-1">
          <div className="w-14 flex flex-col items-center">
            <div className="h-10 w-10 text-white rounded-full bg-gradient-to-tr from-gray-700 to-gray-400 p-1 items-center flex flex-col justify-center mt-1">
              <p className="font-semibold">{stringAvatar(`${candidate?.firstName} ${candidate?.lastName}`)}</p>
              <div className="absolute mt-12 ml-10"> {Icon && <Icon className="h-6 w-6 text-gray-400 bg-white mb-3" />}</div>
            </div>
            <div className="w-12 flex flex-grow items-center justify-center mt-1">
              <div className="w-0.5 h-full bg-gray-200 rounded-full" />
            </div>
          </div>
          <div className="flex justify-between w-full h-full pr-1 pl-1">
            <span className="ml-1 flex flex-col">
              <p className="font-semibold">Karsten Dehler</p>
              <p className=" text-sm text-gray-400 mb-1">{`Commented ${time}`}</p>
              <p className="text-sm font-sans text-gray-600 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default TimelineItem;
