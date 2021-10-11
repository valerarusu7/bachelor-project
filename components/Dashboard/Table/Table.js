import { useMemo } from "react";
import { COLUMNS } from "./columns";
import { useTable } from "react-table";
import candidates from "../../../candidates.json";
import NameCell from "./Cells/NameCell";
import SimpleCell from "./Cells/SimpleCell";
import RegionCell from "./Cells/RegionCell";
import StatusCell from "./Cells/StatusCell";
import TimeCell from "./Cells/TimeCell";
import ScoreCell from "./Cells/ScoreCell";
import FavoriteCell from "./Cells/FavoriteCell";
import Link from "next/link";

function Table({ candidates }) {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => candidates, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <div className="inline-block min-w-full  overflow-hidden align-middle shadow-lg rounded-lg mt-2 border-r-2 border-l-2 border-gray-200">
      <table {...getTableProps()} className="min-w-full">
        <thead className="bg-gray-300 text-gray-600 uppercase text-sm rounded-t-lg w-full">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, idx) => (
                <th {...column.getHeaderProps()} className={`${idx < 4 ? "text-left" : "text-center"} py-3 px-6 `}>
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="text-gray-600">
          {rows.map((row) => {
            prepareRow(row);
            return (
              <Link href={`dashboard/candidate/${row.original.id}`}>
                <tr
                  {...row.getRowProps()}
                  className={`${
                    row.id % 2 ? "bg-white" : "bg-gray-50"
                  } border-b border-gray-200 hover:bg-gray-100 cursor-pointer hover:overflow-hidden`}
                >
                  {row.cells.map((cell, idx) => {
                    return (
                      <td {...cell.getCellProps()} className={`${idx < 4 ? "text-left" : "text-center"} py-3 px-6  whitespace-nowrap`}>
                        {idx == 0 ? (
                          <NameCell firstName={cell.row.original.firstName} lastName={cell.row.original.lastName} />
                        ) : idx == 1 ? (
                          <SimpleCell value={cell.row.original.email} />
                        ) : idx == 2 ? (
                          <SimpleCell value={cell.row.original.position} />
                        ) : idx == 3 ? (
                          <RegionCell region={cell.row.original.region} code={cell.row.original.country_code} />
                        ) : idx == 4 ? (
                          <StatusCell completed={cell.row.original.completed} />
                        ) : idx == 5 ? (
                          <TimeCell time={cell.row.original.time} />
                        ) : idx == 6 ? (
                          <ScoreCell score={cell.row.original.score} />
                        ) : idx == 7 ? (
                          <FavoriteCell favorite={cell.row.original.favorite} />
                        ) : null}
                      </td>
                    );
                  })}
                </tr>
              </Link>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
