import { BanIcon, StarIcon } from "@heroicons/react/solid";

import Link from "next/link";
import { stringAvatar } from "../../helpers/stringAvatar";

function Candidate({ candidate, activeCandidates, activePending, activeCompleted, activeScore, activeFavorites }) {
  return (
    <Link href={`dashboard/candidate/${candidate.id}`}>
      <tr
        className={`${
          candidate.id % 2 ? "bg-white" : "bg-gray-50"
        } border-b border-gray-200 hover:bg-gray-100 cursor-pointer hover:overflow-hidden`}
      >
        <td className="py-3 px-6 text-left whitespace-nowrap">
          <div className="flex items-center">
            <div className="mr-2">
              <div
                className={`${
                  activeCandidates == true
                    ? " border-blue-400 bg-blue-200 text-blue-500"
                    : activeCompleted == true
                    ? "border-green-400 bg-green-200 text-green-500"
                    : activePending == true
                    ? "border-yellow-400 bg-yellow-200 text-yellow-500"
                    : activeScore == true
                    ? "border-red-400 bg-red-200 text-red-500"
                    : activeFavorites == true
                    ? "border-purple-400 bg-purple-200 text-purple-500"
                    : "border-blue-400 bg-blue-200 text-blue-500"
                } w-8 h-8 border-2 rounded-full p-2 flex items-center justify-center`}
              >
                <p className="font-semibold text-sm">{stringAvatar(`${candidate.firstName} ${candidate.lastName}`)}</p>
              </div>
            </div>
            <span>{`${candidate.firstName} ${candidate.lastName}`}</span>
          </div>
        </td>
        <td className="py-3 px-6 text-left">
          <div className="flex items-center">
            <span className="font-medium">{candidate.email}</span>
          </div>
        </td>
        <td className="py-3 px-6 text-left">
          <div className="flex items-center">
            <span className="font-medium hover:underline">{candidate.position}</span>
          </div>
        </td>
        <td className="py-3 px-6 text-left">
          <div className="flex items-center">
            <span>
              <img className="h-4 w-4 mr-1" src={`https://www.countryflags.io/${candidate.countryCode.toLowerCase()}/shiny/64.png`} />
            </span>
            <span className="font-medium">{candidate.region}</span>
          </div>
        </td>
        <td className="py-3 px-6 text-center">
          <span
            className={`${
              candidate.completed == true
                ? " bg-green-200 text-green-600 border border-green-300"
                : " bg-yellow-200 text-yellow-600 border border-yellow-300"
            } py-1 px-3 rounded-full text-xs font-bold `}
          >
            {`${candidate.completed == true ? "Completed" : "Pending"}`}
          </span>
        </td>
        <td className="py-3 px-6 text-center">
          <div className="flex items-center justify-center ">
            <span>{candidate.time !== null ? <p>{candidate.time}</p> : <BanIcon className="h-6 w-6 text-gray-500" />}</span>
          </div>
        </td>
        <td className="py-3 px-6 text-center">
          <div className="flex item-center justify-center">
            <span
              className={`${
                candidate.score == 0
                  ? "text-gray-500"
                  : candidate.score <= 35
                  ? "text-red-600"
                  : candidate.score > 35 && candidate.score <= 60
                  ? "text-yellow-600"
                  : candidate.score > 60 && candidate.score <= 90
                  ? "text-green-600"
                  : candidate.score > 90
                  ? "text-green-800"
                  : null
              } font-bold`}
            >
              {candidate.score != 0 ? <p>{`${candidate.score}%`}</p> : <BanIcon className="h-6 w-6" />}
            </span>
          </div>
        </td>
        <td className="py-3 px-6 text-center">
          <div className="flex items-center justify-center">
            <StarIcon
              className={`${
                candidate.favorite == true ? "text-yellow-400 hover:text-gray-400" : "text-gray-400 hover:text-yellow-400"
              } h-8 w-8 hover:animate-pulse`}
            />
          </div>
        </td>
      </tr>
    </Link>
  );
}

export default Candidate;
