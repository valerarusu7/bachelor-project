import Position from "./Position";

function PositionList({ positions }) {
  return (
    <div className="inline-block min-w-full overflow-hidden align-middle shadow-lg rounded-lg mt-1 border-r-2 border-l-2 border-gray-200">
      <table className=" min-w-full ">
        <thead className="bg-gray-200 text-gray-600 uppercase text-sm  rounded-t-lg w-full">
          <tr>
            <th className="py-3 px-6 text-left">ID</th>
            <th className="py-3 px-6 text-left">Position</th>
            <th className="py-3 px-6 text-center">Location</th>
            <th className="py-3 px-6 text-center">Type</th>
            <th className="py-3 px-6 text-center">Posted</th>
          </tr>
        </thead>
        <tbody className="text-gray-600">
          {positions.map((position) => (
            <Position position={position} key={position.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PositionList;
