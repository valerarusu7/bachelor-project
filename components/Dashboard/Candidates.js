import Candidate from "./Candidate";

function Candidates({ candidates, activeCandidates, activePending, activeCompleted, activeScore, activeFavorites }) {
  return (
    <div>
      <div className="inline-block min-w-full overflow-hidden align-middle shadow-lg rounded-lg mt-4 border-r-2 border-l-2 border-gray-200">
        <table className=" min-w-full ">
          <thead className="bg-gray-200 text-gray-600 uppercase text-sm  rounded-t-lg w-full">
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
