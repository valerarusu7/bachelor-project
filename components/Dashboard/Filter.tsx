import SelectionFilter from "./SelectionFilter";
import Slider from "@mui/material/Slider";
import { Fragment, MouseEventHandler, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { GlobeIcon, BriefcaseIcon, ClipboardCheckIcon, MenuAlt1Icon } from "@heroicons/react/outline";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  resetfilters,
  selectDashboard,
  setFilterAll,
  setFilterCompleted,
  setFilterFavorite,
  setFilterPending,
  setDisableScore,
  setScore,
  resetState,
  setPosition,
  setRegion,
} from "../../store/reducers/dashboardSlice";

export interface FilterProps {
  applyFilter: MouseEventHandler<HTMLButtonElement> | undefined;
  isOpen: boolean;
  onClose: any;
}

function Filter({ applyFilter, isOpen, onClose }: FilterProps) {
  const {
    dashboardDisableScore,
    dashboardFilterAll,
    dashboardFilterCompleted,
    dashboardFilterFavorite,
    dashboardFilterPending,
    dashboardPosition,
    dashboardPositions,
    dashboardRegion,
    dashboardRegions,
    dashboardScore,
  } = useAppSelector(selectDashboard);
  const dispatch = useAppDispatch();
  const cancelButtonRef = useRef(null);

  function resetCandidates() {
    dispatch(resetfilters());
    dispatch(setFilterAll(true));
  }

  function filterCompleted() {
    dispatch(resetfilters());
    dispatch(setFilterCompleted(true));
  }

  function filterPending() {
    dispatch(resetfilters());
    dispatch(setFilterPending(true));
  }

  function filterFavorites() {
    dispatch(resetfilters());
    dispatch(setFilterFavorite(true));
  }

  function setScoreValue(e: any) {
    dispatch(setScore(e.target.value));
  }

  function reset() {
    dispatch(setPosition(dashboardPositions[0]));
    dispatch(setRegion(dashboardRegions[0]));
    dispatch(resetState());
  }

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={onClose}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-gray-100 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="p-4">
                <div>
                  <div className="flex mb-2">
                    <BriefcaseIcon className="h-6 w-6 text-gray-600 mr-1" />
                    <label htmlFor="filter-candidates" className="block text-md font-medium text-gray-700">
                      Filter by Positions
                    </label>
                  </div>
                  <SelectionFilter
                    data={dashboardPositions}
                    selected={dashboardPosition}
                    setSelected={(e: any) => dispatch(setPosition(e))}
                  />
                </div>
                <div className="mt-4">
                  <div className="flex mb-2">
                    <GlobeIcon className="h-6 w-6 text-gray-600 mr-1" />
                    <label htmlFor="filter-candidates" className="block text-md font-medium text-gray-700">
                      Filter by Regions
                    </label>
                  </div>
                  <SelectionFilter
                    data={dashboardRegions}
                    selected={dashboardRegion}
                    setSelected={(e: any) => dispatch(setRegion(e))}
                  />
                </div>

                <div className="mt-4">
                  <div className="flex mb-2">
                    <ClipboardCheckIcon className="h-6 w-6 text-gray-600 mr-1" />
                    <label htmlFor="filter-candidates" className="block text-md font-medium text-gray-700">
                      Filter by Status
                    </label>
                  </div>
                  <div className="flex justify-between mt-3 pl-1">
                    <div className="flex items-center">
                      <input
                        name="filter"
                        type="radio"
                        checked={dashboardFilterAll}
                        onChange={() => resetCandidates()}
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                      />
                      <label htmlFor="push-everything" className="ml-3 block text-sm font-medium text-gray-700">
                        All
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        name="filter"
                        type="radio"
                        checked={dashboardFilterCompleted}
                        onChange={() => filterCompleted()}
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                      />
                      <label htmlFor="push-email" className="ml-3 block text-sm font-medium text-gray-700">
                        Completed
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        name="filter"
                        type="radio"
                        checked={dashboardFilterPending}
                        onChange={() => filterPending()}
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                      />
                      <label htmlFor="push-email" className="ml-3 block text-sm font-medium text-gray-700">
                        Pending
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        name="filter"
                        type="radio"
                        checked={dashboardFilterFavorite}
                        onChange={() => filterFavorites()}
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                      />
                      <label htmlFor="push-email" className="ml-3 block text-sm font-medium text-gray-700">
                        Favorites
                      </label>
                    </div>
                  </div>
                </div>
                <div className="mt-4 ">
                  <div className="flex justify-between items-center">
                    <div className="flex mb-2 ">
                      <MenuAlt1Icon
                        className={`h-6 w-6 ${dashboardDisableScore ? "text-gray-400" : "text-gray-600"}  mr-1`}
                      />
                      <label
                        htmlFor="filter-candidates"
                        className={`block text-md font-medium ${
                          dashboardDisableScore ? "text-gray-400" : "text-gray-700"
                        }`}
                      >
                        Filter by Score
                      </label>
                    </div>

                    <input
                      type="checkbox"
                      checked={!dashboardDisableScore}
                      onChange={() => dispatch(setDisableScore(!dashboardDisableScore))}
                      className="rounded-md"
                    />
                  </div>
                  <div className="pl-3 pr-2 mt-2">
                    <Slider
                      getAriaLabel={() => "Score range"}
                      value={dashboardScore}
                      onChange={(e: any) => setScoreValue(e)}
                      valueLabelDisplay="auto"
                      disableSwap
                      disabled={dashboardDisableScore}
                    />
                  </div>
                  {!dashboardDisableScore ? (
                    <p className="text-sm text-gray-500">{`The candidates are filtered with the score between ${dashboardScore[0]} and ${dashboardScore[1]}.`}</p>
                  ) : null}
                </div>
              </div>
              <div className="bg-gray-50 pr-4 py-3  flex justify-between">
                <div>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => reset()}
                  >
                    Reset filters
                  </button>
                </div>
                <div className="flex">
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={onClose}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={applyFilter}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default Filter;
