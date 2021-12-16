import { StarIcon, TrashIcon } from "@heroicons/react/solid";
import { ICandidateProps } from "../../../types";
import InfoItem from "../InfoItem";
import Separator from "../../common/Separator";
import { stringAvatar } from "../../../helpers/stringAvatar";
import { useState } from "react";

function CandidateInfo({ candidate }: ICandidateProps) {
  const [favorite, setFavoriteState] = useState(candidate.favorite);

  function setFavorite(favorite: boolean) {
    setFavoriteState(favorite);
    fetch(`/api/candidates/${candidate._id}?favorite=${favorite}`, {
      method: "PATCH",
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((text) => {
            setFavoriteState(!favorite);
            throw new Error(text.error[0]);
          });
        }
      })
      .catch((error) => {
        alert(error);
      });
  }

  function deleteCandidate() {
    fetch(`/api/candidates/${candidate._id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((text) => {
            setFavoriteState(!favorite);
            throw new Error(text.error[0]);
          });
        }
      })
      .catch((error) => {
        alert(error);
      });
  }

  return (
    <div className="max-h-80 bg-white rounded-lg shadow-lg mr-4 p-2 flex flex-col border border-gray-300">
      <div className="flex h-28 w-full">
        <div className="h-40 w-40 rounded-full bg-gray-300 relative border-8 border-gray-100 ml-8 -top-12 flex justify-center items-center p-1">
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
              className={`${
                favorite === true
                  ? "text-yellow-400 hover:text-gray-400"
                  : "text-gray-400 hover:text-yellow-400"
              } h-8 w-8 cursor-pointer hover:animate-pulse mb-2`}
              onClick={() => setFavorite(!candidate.favorite)}
            />
            <TrashIcon
              className="h-8 w-8 cursor-pointer hover:text-red-500 text-gray-500"
              onClick={() => deleteCandidate()}
            />
          </div>
        </div>
      </div>
      <Separator />
      <div className="grid grid-cols-3 justify-center items-center h-full ">
        <InfoItem label="Email" value={candidate.email} />
      </div>
    </div>
  );
}

export default CandidateInfo;
