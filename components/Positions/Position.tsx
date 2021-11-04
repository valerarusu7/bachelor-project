import Link from "next/link";
import { IPositionProps } from "../../types";

function Position({ position }: IPositionProps) {
  return (
    <Link href={`positions/${position._id}`}>
      <tr className="border-b border-gray-200 hover:bg-gray-100 cursor-pointer hover:overflow-hidden">
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
        <td className="py-3 px-6 text-center">
          <div className="flex items-center justify-center">
            <p className="font-semibold">{position.type}</p>
          </div>
        </td>
        <td className="py-3 px-6 text-center">
          <div className="flex items-center justify-center">
            {position.recruitingStartDate}
          </div>
        </td>
      </tr>
    </Link>
  );
}

export default Position;
