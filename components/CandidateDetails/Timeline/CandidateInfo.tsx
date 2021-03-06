import { StarIcon, TrashIcon } from "@heroicons/react/solid";
import { ICandidateProps } from "../../../types";
import InfoItem from "../InfoItem";
import Separator from "../../common/Separator";
import { stringAvatar } from "../../../helpers/stringAvatar";
import { useState } from "react";
import Confirmation from "../../common/DeleteConfirmation";
import { useRouter } from "next/router";

function CandidateInfo({ candidate }: ICandidateProps) {
  const [favorite, setFavoriteState] = useState(candidate.favorite);
  const [isDeleteOpen, setDeleteOpen] = useState(false);

  const router = useRouter();

  function setFavorite() {
    setFavoriteState(!favorite);
    fetch(`/api/candidates/${candidate._id}?favorite=${!favorite}`, {
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
        if (response.ok) {
          router.push("/dashboard");
        } else {
          return response.json().then((text) => {
            throw new Error(text.error);
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
        <Confirmation
          isOpen={isDeleteOpen}
          onClose={() => setDeleteOpen(false)}
          deleteItem={() => deleteCandidate()}
          question="Do you really want to delete this candidate?"
        />
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
              onClick={() => setFavorite()}
            />
            <TrashIcon
              className="h-8 w-8 cursor-pointer hover:text-red-500 text-gray-500"
              onClick={() => setDeleteOpen(true)}
            />
            {/* <PencilIcon className="h-8 w-8 cursor-pointer hover:text-green-500 text-gray-500 mb-2" /> */}
          </div>
        </div>
      </div>
      <Separator />
      {/* info */}
      <div className="grid grid-cols-3 justify-center items-center h-full ">
        <InfoItem label="Email" value={candidate.email} />
        {/* <InfoItem label="Interview result" value={`${candidate.interviews[0].score}%`} />
        <InfoItem label="Completion time" value={candidate.interviews[0].time} /> */}
      </div>
    </div>
  );
}

export default CandidateInfo;
