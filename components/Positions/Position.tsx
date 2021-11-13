import { IPositionProps } from "../../types";
import Link from "next/link";
import moment from "moment";

function Position({ position, idx }: IPositionProps) {
  return (
    <tr
      className={`${
        idx !== undefined && idx % 2 ? "bg-white" : "bg-gray-50"
      } border-b border-gray-200 cursor-pointer hover:overflow-hidden hover:bg-gray-200`}
    >
      <td className="py-3 px-6 text-left whitespace-nowrap">
        <div className="flex items-center">
          <div className="mr-2">
            <p className="font-semibold text-gray-500">{position._id}</p>
          </div>
        </div>
      </td>
      <td className="py-3 px-6 text-left">
        <div className="flex items-center">
          <span className="font-medium">{position.name}</span>
        </div>
      </td>
      <td className="py-3 px-6 text-center">
        <span>{position.location}</span>
      </td>
      {/* <td className="py-3 px-6 text-center">
          <div className="flex items-center justify-center">
            <p className="font-semibold">{position.type}</p>
          </div>
        </td> */}
      <td className="py-3 px-6 text-center">
        <div className="flex items-center justify-center text-sm capitalize">
          {moment(moment.utc(position.recruitingStartDate), "YYYYMMDD").fromNow()}
        </div>
      </td>
    </tr>
  );
}

export default Position;
