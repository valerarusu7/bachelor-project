import { ChatAltIcon, CheckCircleIcon, ClockIcon, EyeIcon, StarIcon, UserCircleIcon, VideoCameraIcon } from "@heroicons/react/solid";

import Separator from "../../common/Separator";
import TimelineItem from "./TimelineItem";
import { stringAvatar } from "../../../helpers/stringAvatar";
import { ICandidateProps } from "../../../types";
import CustomButton from "../../common/CustomButton";
import moment from "moment";

function CandidateTimeline({ candidate, videoInterview, comments, interviews }: ICandidateProps) {
  console.log(comments);
  return (
    <div className="flex justify-start h-full">
      <div className="flex flex-col w-full ">
        <p className="font-bold text-gray-600 text-xl mb-2">Activity History</p>
        <TimelineItem
          Icon={UserCircleIcon}
          date={moment(moment.utc(videoInterview.createdAt), "YYYYMMDD").format("ll").toString()}
          helpText="Interested in"
          position={interviews.map((interview: any) => {
            return `${interview.name} ${interviews.length > 1 ? "," : ""}`;
          })}
          color="blue"
          show={true}
        />
        <TimelineItem
          Icon={VideoCameraIcon}
          date={moment(moment.utc(videoInterview.createdAt), "YYYYMMDD").format("ll").toString()}
          helpText="Interacted with the video"
          position=""
          color="purple"
          show={true}
        />
        {interviews.map((interview: any) => (
          <TimelineItem
            Icon={ClockIcon}
            date={moment(moment.utc(interview.completedUtc), "YYYYMMDD").format("ll").toString()}
            helpText={"Started the interview"}
            position={interview.name}
            color="gray"
            show={true}
          />
        ))}
        {interviews.map((interview: any) => (
          <TimelineItem
            Icon={CheckCircleIcon}
            date={moment(moment.utc(interview.completedUtc), "YYYYMMDD").format("ll").toString()}
            helpText="Completed the interview"
            position={interview.name}
            color="green"
            show={true}
          />
        ))}

        {/* <TimelineItem Icon={EyeIcon} date="27 sep" helpText="Assessed by" position="Karsten Dehler" color="gray" /> */}
        {comments.map((comment: any) => (
          <TimelineItem
            Icon={ChatAltIcon}
            comment={true}
            manager={comment.userId}
            time={moment(moment.utc(comment.createdAt), "YYYYMMDD").startOf("hour").fromNow().toString()}
            commentText={comment.comment}
            show={false}
          />
        ))}
        {/* <TimelineItem Icon={StarIcon} date="27 sep" helpText="Added to favorites by" position="Karsten Dehler" color="yellow" show={true} /> */}
        <Separator />
        <div className="flex">
          <div className="h-10 w-10 text-white rounded-full bg-gradient-to-tr from-gray-700 to-gray-400 p-1 items-center flex flex-col justify-center mr-2">
            <p className="font-semibold">{stringAvatar(`${candidate.firstName} ${candidate.lastName}`)}</p>
          </div>
          <input
            type="text"
            className="focus:ring-blue-500 focus:border-blue-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300 mr-2"
            placeholder="Leave a comment"
          />
          <CustomButton type="submit" color="blue">
            <p>Comment</p>
          </CustomButton>
        </div>
      </div>
    </div>
  );
}

export default CandidateTimeline;
