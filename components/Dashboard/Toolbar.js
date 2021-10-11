import { SearchIcon, FilterIcon, ChevronDownIcon } from "@heroicons/react/solid";
import PositionFilter from "./PositionFilter";

function Toolbar({
  activeCandidates,
  activePending,
  activeCompleted,
  activeScore,
  activeFavorites,
  onClickAll,
  onClickCompleted,
  onClickPending,
  onClickScore,
  onClickFavorites,
  positions,
  selected,
  setSelected,
}) {
  return (
    <div className="flex justify-between mt-1 items-center">
      <div className="flex items-center">
        <div className="flex items-center bg-white mr-2 p-0.5 rounded-lg shadow-lg">
          <div
            onClick={onClickAll}
            className={`${
              activeCandidates == true ? "bg-gray-500 text-white" : "text-gray-700"
            } p-1 pr-2 pl-2 font-sans font-normal rounded-lg  mr-2 cursor-pointer`}
          >
            <p>All</p>
          </div>
          <div
            onClick={onClickCompleted}
            className={`${
              activeCompleted == true ? "bg-gray-500 text-white" : "text-gray-700"
            } p-1 pr-2 pl-2 font-normal rounded-lg mr-2 cursor-pointer`}
          >
            <p>Completed</p>
          </div>
          <div
            onClick={onClickPending}
            className={`${
              activePending == true ? "bg-gray-500 text-white" : "text-gray-700"
            } p-1 pr-2 pl-2 font-normal rounded-lg mr-2 cursor-pointer`}
          >
            <p>Pending</p>
          </div>
          <div
            onClick={onClickScore}
            className={`${
              activeScore == true ? "bg-gray-500 text-white" : "text-gray-700"
            } p-1 pr-2 pl-2 font-normal rounded-lg  mr-2 cursor-pointer`}
          >
            <p>Perfect Score</p>
          </div>
          <div
            onClick={onClickFavorites}
            className={`${
              activeFavorites == true ? "bg-gray-500 text-white" : "text-gray-700"
            } p-1 pr-2 pl-2 font-normal rounded-lg cursor-pointer`}
          >
            <p>Favorites</p>
          </div>
        </div>
        <div className="flex items-center mr-2">
          <PositionFilter positions={positions} selected={selected} setSelected={setSelected} />
        </div>
      </div>
      {/* Search */}
      <div className="flex px-1">
        <div className="flex items-center justify-center px-2">
          <SearchIcon className="h-6 w-6 text-gray-600" />
        </div>
        <input type="text" className="px-4 w-48 rounded-lg" placeholder="Search..." />
      </div>
    </div>
  );
}

export default Toolbar;
