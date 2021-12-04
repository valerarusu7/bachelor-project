import Candidate from "./Candidate";
import { ICandidatesProps } from "../../types";

function Candidates({ candidates }: ICandidatesProps) {
  return (
    <div>
      <div className="inline-block min-w-full overflow-hidden align-middle shadow-lg rounded-md mt-2 border border-gray-300">
        <table className="min-w-full table-fixed ">
          <thead className="bg-gray-100  text-sm rounded-t-lg w-full pointer-events-none text-gray-600">
            <tr>
              <th className="py-2 px-3 text-left font-semibold">Candidate</th>
              <th className="py-2 px-3 text-left font-semibold">Email</th>
              <th className="py-2 px-3 text-left font-semibold">Regions</th>
              <th className="py-3 px-6 text-left font-semibold">Positions</th>
              <th className="py-2 px-3 text-center font-semibold">Favorite</th>

              {/* <th className="py-2 px-3 text-center font-semibold">Status</th>
              <th className="py-2 px-3 text-center font-semibold">Time</th>
              <th className="py-2 px-3 text-center font-semibold">Score</th> */}
            </tr>
          </thead>
          <tbody className="text-gray-600">
            {candidates.map((candidate, idx) => (
              <Candidate candidate={candidate} idx={idx} key={candidate._id} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Candidates;
