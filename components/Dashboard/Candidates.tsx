import { ICandidatesProps } from "../../types";
import Candidate from "./Candidate";

function Candidates({ candidates }: ICandidatesProps) {
  return (
    <div>
      <div className="inline-block min-w-full  overflow-hidden align-middle shadow-lg rounded-lg mt-2 border-r-2 border-l-2 border-gray-200">
        <table className="min-w-full ">
          <thead className="bg-gradient-to-tr from-gray-700 to-gray-400 text-white uppercase text-sm rounded-t-lg w-full pointer-events-none">
            <tr>
              <th className="py-3 px-6 text-left">Candidate</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Position</th>
              <th className="py-3 px-6 text-left">Region</th>
              <th className="py-3 px-6 text-center">Status</th>
              <th className="py-3 px-6 text-center">Time</th>
              <th className="py-3 px-6 text-center">Score</th>
              <th className="py-3 px-6 text-center">Favorite</th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            {candidates.map((candidate) => (
              <Candidate candidate={candidate} key={candidate._id} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Candidates;
