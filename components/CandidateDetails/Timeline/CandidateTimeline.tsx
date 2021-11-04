import {
  ChatAltIcon,
  CheckCircleIcon,
  ClockIcon,
  EyeIcon,
  StarIcon,
  UserCircleIcon,
  VideoCameraIcon,
} from "@heroicons/react/solid";

import Separator from "../../common/Separator";
import TimelineItem from "./TimelineItem";
import { stringAvatar } from "../../../helpers/stringAvatar";
import { ICandidateProps } from "../../../types";

function CandidateTimeline({ candidate }: ICandidateProps) {
  return (
    <div className="flex justify-start">
      <div className="flex flex-col w-full">
        <p className="font-bold text-gray-600 text-xl mb-2">Activity History</p>
        <TimelineItem
          Icon={UserCircleIcon}
          date="23 sep"
          helpText="Applied to"
          position="Backend Developer"
          color="blue"
        />
        <TimelineItem
          Icon={VideoCameraIcon}
          date="23 sep"
          helpText="Interacted with the video"
          position=""
          color="purple"
        />
        <TimelineItem Icon={ClockIcon} date="23 sep" helpText="Started the interview" position="" color="gray" />
        <TimelineItem
          Icon={CheckCircleIcon}
          date="24 sep"
          helpText="Completed the interview"
          position=""
          color="green"
        />
        <TimelineItem Icon={EyeIcon} date="27 sep" helpText="Assessed by" position="Karsten Dehler" color="gray" />
        <TimelineItem Icon={ChatAltIcon} comment={true} candidate={candidate} time="4m ago" />
        <TimelineItem
          Icon={StarIcon}
          date="27 sep"
          helpText="Added to favorites by"
          position="Karsten Dehler"
          color="yellow"
          show={true}
        />
        <Separator />
        <div className="flex">
          <div className="h-10 w-10 text-gray-500 rounded-full bg-gray-200 p-1 items-center flex flex-col justify-center mr-2">
            <p className="font-semibold">{stringAvatar(`${candidate.firstName} ${candidate.lastName}`)}</p>
          </div>
          <input
            type="text"
            className="focus:ring-blue-500 focus:border-blue-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300 mr-2"
            placeholder="Leave a comment"
          />
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Comment
          </button>
        </div>
      </div>
    </div>
  );
}

export default CandidateTimeline;
