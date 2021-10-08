import { FilterIcon, ArrowNarrowDownIcon, ArrowNarrowUpIcon } from "@heroicons/react/solid";
import { Tooltip } from "@material-ui/core";
import { useEffect, useState } from "react";

import { chartData } from "../../chartData";
import StatChart from "./StatChart";

function Stat({ value, name, onClick, type, active }) {
  const [percentageValue, setPercentageValue] = useState(0);
  const [tooltip, setTooltip] = useState("");

  useEffect(() => {
    setPercentageValue(calculatePercentageValue(type));
  }, [type]);

  const colorCode =
    type === "candidates" && active
      ? "hover:text-blue-400"
      : type === "completed" && active
      ? "hover:text-green-400"
      : type === "pending" && active
      ? "hover:text-yellow-400"
      : type === "perfectScore" && active
      ? "hover:text-red-400"
      : type === "favorites" && active
      ? "hover:text-purple-400"
      : "hover:text-gray-400";

  function returnNonZeroValue(type) {
    for (let i = chartData.length - 2; i < chartData.length - 1; i--) {
      if (chartData[i][type] !== 0) {
        return chartData[i];
      }
    }
  }

  function calculatePercentageValue(type) {
    let lastMonthValue = returnNonZeroValue(type);
    console.log(lastMonthValue);
    let currentMonthValue = chartData[chartData.length - 1][type];
    let percentageValue = Number((currentMonthValue / lastMonthValue[type]) * 100 - 100).toFixed(2);
    let tooltipString = `${`${lastMonthValue[type]} in ${lastMonthValue["name"]}`}`;
    setTooltip(tooltipString);
    return percentageValue;
  }

  return (
    <div
      className={`${
        type === "candidates" && active
          ? "text-blue-500 opacity-100"
          : type === "completed" && active
          ? "text-green-500 opacity-100"
          : type === "pending" && active
          ? "text-yellow-500 opacity-100"
          : type === "perfectScore" && active
          ? "text-red-500 opacity-100"
          : type === "favorites" && active
          ? "text-purple-500 opacity-100"
          : "text-gray-600 opacity-70 shadow-sm"
      } hover:opacity-100 group flex flex-col p-2 bg-white dark:bg-gray-700 rounded-lg shadow-lg relative z-40 transition duration-400 m-1 last:mr-0 first:ml-0 `}
    >
      <div className="flex justify-between items-center">
        <p className=" uppercase font-bold">{name}</p>
        <div className="flex items-center">
          <FilterIcon className={`${colorCode} h-6 w-6  cursor-pointer`} onClick={onClick} />
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex ">
          <h1 className="text-4xl font-bold uppercase mr-3">{value}</h1>
          <Tooltip title={tooltip} arrow>
            <div
              className={`${
                active === true ? "opacity-100" : "opacity-0"
              } flex items-center transition transform duration-500 group-hover:opacity-100 cursor-pointer`}
            >
              <div
                className={`${
                  percentageValue == 0
                    ? " text-gray-500"
                    : percentageValue > 0
                    ? " text-green-500"
                    : percentageValue < 0
                    ? " text-red-500"
                    : null
                } flex justify-center items-center rounded-md p-1 h-8 w-26`}
              >
                <div>
                  {percentageValue > 0 ? (
                    <ArrowNarrowUpIcon className="h-4 w-4 text-green-600 font-bold" />
                  ) : percentageValue < 0 ? (
                    <ArrowNarrowDownIcon className="h-4 w-4 text-red-600 font-bold" />
                  ) : null}
                </div>
                <p className="font-bold ">{`${percentageValue}%`}</p>
              </div>
            </div>
          </Tooltip>
        </div>
      </div>
      {type === "candidates" ? (
        <StatChart data={chartData} dataKey={type} stroke={`${active === true ? "#3b82f6" : "#6b7280"}`} />
      ) : type === "completed" ? (
        <StatChart data={chartData} dataKey={type} stroke={`${active === true ? "#15ba87" : "#6b7280"}`} />
      ) : type === "pending" ? (
        <StatChart data={chartData} dataKey={type} stroke={`${active === true ? "#f59e0b" : "#6b7280"}`} />
      ) : type === "perfectScore" ? (
        <StatChart data={chartData} dataKey={type} stroke={`${active === true ? "#ef4444" : "#6b7280"}`} />
      ) : type === "favorites" ? (
        <StatChart data={chartData} dataKey={type} stroke={`${active === true ? "#8b5cf6" : "#6b7280"}`} />
      ) : null}
    </div>
  );
}

export default Stat;
