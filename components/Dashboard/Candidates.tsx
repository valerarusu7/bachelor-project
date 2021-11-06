import Candidate from "./Candidate";
export interface Candidate {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  position: string;
  region: string;
  countryCode: string;
  completed: boolean;
  time: string;
  score: number;
  favorite: boolean;
}

export interface Candidates {
  candidates: Candidate[];
}

function Candidates({ candidates }: Candidates) {
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
              <Candidate candidate={candidate} key={candidate.id} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Candidates;
