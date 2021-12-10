import { PencilIcon, StarIcon, TrashIcon } from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";

import { ICandidateProps } from "../../../types";
import InfoItem from "../InfoItem";
import Separator from "../../common/Separator";
import { stringAvatar } from "../../../helpers/stringAvatar";

function CandidateInfo({ candidate }: ICandidateProps) {
  const [favorite, setFavorite] = useState(candidate.favorite);

  function updateFavorite() {
    setFavorite(!favorite);
    fetch(`/api/candidates/${candidate._id}?favorite=${!favorite}`, {
      method: "PATCH",
      body: JSON.stringify({
        ...candidate,
        id: candidate._id,
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log(favorite, "before");
        } else {
          return response.text().then((text) => {
            throw new Error(text);
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className=" max-h-80 bg-white rounded-lg shadow-lg mr-4 p-2 flex flex-col border border-gray-300">
      <div className="flex h-28 w-full">
        <div className="h-40 w-40 rounded-full bg-gray-300 relative border-8 border-gray-200 ml-8 -top-12 flex justify-center items-center p-1">
          <p className="text-6xl font-bold text-gray-500">
            {stringAvatar(`${candidate.firstName} ${candidate.lastName}`)}
          </p>
        </div>
        <div className="flex flex-grow justify-between items-center ml-4 mb-8">
          <div>
            <p className="2xl:text-4xl xl:text-2xl lg:text-xl font-semibold text-gray-600">{`${candidate.firstName} ${candidate.lastName}`}</p>
          </div>
          <div className="h-full">
            <StarIcon
              onClick={() => updateFavorite()}
              className={`${
                favorite ? "text-yellow-400 " : "text-gray-400 "
              } h-8 w-8 cursor-pointer mb-2 hover:opacity-80`}
            />
            <PencilIcon className="h-8 w-8 cursor-pointer hover:text-green-500 text-gray-500 mb-2" />
            <TrashIcon className="h-8 w-8 cursor-pointer hover:text-red-500 text-gray-500" />
          </div>
        </div>
      </div>
      <Separator />
      {/* info */}
      <div className="grid grid-cols-3 justify-center items-center h-full ">
        <InfoItem label="Email" value={candidate.email} />
        <InfoItem label="Position" value={candidate.interviews[0].position} />
        <InfoItem
          label="Interview result"
          value={`${candidate.interviews[0].score}%`}
        />
        <InfoItem
          label="Completion time"
          value={candidate.interviews[0].time}
        />
      </div>
    </div>
  );
}

export default CandidateInfo;
