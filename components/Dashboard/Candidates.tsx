import Candidate from "./Candidate";
import { ICandidatesProps } from "../../types";

function Candidates({ candidates }: ICandidatesProps) {
  return (
    <div>
      <div className="inline-block min-w-full  overflow-hidden align-middle shadow-xl rounded-md mt-2 ">
        <table className="min-w-full table-fixed">
          <thead className="bg-gray-200 uppercase text-sm rounded-t-lg w-full pointer-events-none">
            <tr>
              <th className="py-2 px-3 text-left">Candidate</th>
              <th className="py-2 px-3  text-left">Email</th>
              <th className="py-3 px-6 text-left">Position</th>
              <th className="py-2 px-3  text-left">Region</th>
              <th className="py-2 px-3  text-center">Status</th>
              <th className="py-2 px-3  text-center">Time</th>
              <th className="py-2 px-3  text-center">Score</th>
              <th className="py-2 px-3  text-center">Favorite</th>
            </tr>
          </thead>
          <tbody >
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
