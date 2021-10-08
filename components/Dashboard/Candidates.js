import { BriefcaseIcon, UsersIcon } from "@heroicons/react/solid";

import Candidate from "./Candidate";

function Candidates({
  candidates,
  activeCandidates,
  activePending,
  activeCompleted,
  activeScore,
  activeFavorites,
  filterByUsers,
  filterByPosition,
}) {
  return (
    <div>
      <div className="flex justify-end pr-1 mt-1">
        <div className="rounded-lg p-1 border flex items-center">
          <div className="mr-1">
            <p className="font-semibold text-gray-700">Filter by</p>
          </div>
          <input
            type="text"
            className="focus:ring-blue-500 focus:border-blue-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300 mr-1"
          />
          <div
            className={`${
              filterByUsers == true ? "" : ""
            } rounded-full p-1 bg-blue-400 border-blue-500 mr-1 cursor-pointer h-10 w-10 flex justify-center items-center text-white`}
          >
            <UsersIcon className="h-6 w-6 " />
          </div>
          <div className="rounded-full p-1 bg-white cursor-pointer h-8 w-8 text-gray-200">
            <BriefcaseIcon className="h-6 w-6" />
          </div>
        </div>
      </div>
      <div className="inline-block min-w-full overflow-hidden align-middle shadow-lg rounded-lg mt-2 border-r-2 border-l-2 border-gray-200">
        <table className=" min-w-full ">
          <thead className="bg-gray-300 text-gray-600 uppercase text-sm  rounded-t-lg w-full">
            <tr>
              <th className="py-3 px-6 text-left">Candidate</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Position</th>
              <th className="py-3 px-6 text-center">Status</th>
              <th className="py-3 px-6 text-center">Time</th>
              <th className="py-3 px-6 text-center">Score</th>
              <th className="py-3 px-6 text-center">Favorite</th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            {candidates.map((candidate) => (
              <Candidate
                candidate={candidate}
                key={candidate.id}
                activeCandidates={activeCandidates}
                activePending={activePending}
                activeCompleted={activeCompleted}
                activeScore={activeScore}
                activeFavorites={activeFavorites}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Candidates;
