import { BanIcon, StarIcon } from "@heroicons/react/solid";

import { ICandidateProps } from "../../types";
import Link from "next/link";
import { stringAvatar } from "../../helpers/stringAvatar";

function Candidate({ candidate, idx }: ICandidateProps) {
  return (
    <Link href={`dashboard/candidate/${candidate._id}`}>
      <tr
        className={`${
          idx % 2 ? "bg-white" : "bg-gray-50"
        } border-b border-gray-200 cursor-pointer hover:overflow-hidden hover:bg-blue-100`}
      >
        <td className="py-3 px-3 text-left whitespace-nowrap">
          <div className="flex items-center">
            <div className="mr-2">
              <div className="bg-gradient-to-tr from-blue-600 to-blue-300 text-white w-8 h-8 rounded-full p-2 flex items-center justify-center">
                <p className="font-semibold text-sm">
                  {stringAvatar(`${candidate.firstName} ${candidate.lastName}`)}
                </p>
              </div>
            </div>
            <span>{`${candidate.firstName} ${candidate.lastName}`}</span>
          </div>
        </td>
        <td className="py-3 px-3 text-left">
          <div className="flex items-center">
            <span className="font-medium">{candidate.email}</span>
          </div>
        </td>
        <td className="py-3 px-6 text-left">
          <div className=" flex items-center">
            <p className="font-medium ">
              {candidate.position.length >= 33
                ? `${candidate.position.substring(0, 33)}...`
                : candidate.position}
            </p>
          </div>
        </td>
        <td className="py-3 px-3 text-left">
          <div className="flex items-center">
            {/* <span>
              <img className="h-4 w-4 mr-1" src={`https://www.countryflags.io/${candidate.countryCode.toLowerCase()}/shiny/64.png`} />
            </span> */}
            <span className="font-medium">{candidate.region}</span>
          </div>
        </td>
        <td className="py-3 px-3 text-center ">
          <div
            className={`${
              candidate.completed == true
                ? " bg-gradient-to-tr from-green-500 to-green-300 text-white border"
                : " bg-gradient-to-tr from-orange-500 to-yellow-300 text-white border"
            } py-1 px-3 rounded-full text-xs font-bold `}
          >
            <p className="truncate">{`${
              candidate.completed == true ? "Completed" : "Pending"
            }`}</p>
          </div>
        </td>
        <td className="py-3 px-3 text-center">
          <div className="flex items-center justify-center ">
            <span>
              {candidate.time !== "" ? (
                <p>{candidate.time}</p>
              ) : (
                <BanIcon className="h-6 w-6 text-gray-500" />
              )}
            </span>
          </div>
        </td>
        <td className="py-3 px-3 text-center">
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
              {candidate.score != 0 ? (
                <p>{`${candidate.score}%`}</p>
              ) : (
                <BanIcon className="h-6 w-6" />
              )}
            </span>
          </div>
        </td>
        <td className="py-3 px-3 text-center">
          <div className="flex items-center justify-center">
            <StarIcon
              className={`${
                candidate.favorite == true
                  ? "text-yellow-400 hover:text-gray-400"
                  : "text-gray-400 hover:text-yellow-400"
              } h-8 w-8 hover:animate-pulse`}
            />
          </div>
        </td>
      </tr>
    </Link>
  );
}

export default Candidate;
