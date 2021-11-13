import { IPositionsProps } from "../../types";
import Position from "./Position";

function PositionList({ positions }: IPositionsProps) {
  return (
    <div className="inline-block min-w-full overflow-hidden align-middle shadow-lg rounded-md mt-2 border border-gray-300">
      <table className="min-w-full table-fixed ">
        <thead className="bg-gray-100  text-sm rounded-t-lg w-full pointer-events-none text-gray-600">
          <tr>
            <th className="py-3 px-6 text-left">ID</th>
            <th className="py-3 px-6 text-left">Position</th>
            <th className="py-3 px-6 text-center">Location</th>
            <th className="py-3 px-6 text-center">Posted</th>
          </tr>
        </thead>
        <tbody className="text-gray-600">
          {positions.map((position, idx) => (
            <Position position={position} idx={idx} key={position._id} />
          ))}
        </tbody>
      </table>
      {console.log(positions)}
    </div>
  );
}

export default PositionList;
