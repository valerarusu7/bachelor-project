import { filterByScore, filterCandidates } from "../../helpers/filters";

import Candidates from "../../components/Dashboard/Candidates";
import Filter from "../../components/Dashboard/Filter";
import { FilterIcon } from "@heroicons/react/solid";
import Layout from "../../components/Layout/Layout";
import candidates from "../../candidates.json";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectDashboard, setPosition, setPositions, setRegion, setRegions } from "../../store/reducers/dashboardSlice";
import { IDashboardProps, ICandidates, IPositions, IRegions } from "../../types";

function DashboardPage({ candidates, positions, regions }: IDashboardProps) {
  const {
    dashboardDisableScore,
    dashboardFilterAll,
    dashboardFilterCompleted,
    dashboardFilterFavorite,
    dashboardFilterPending,
    dashboardPosition,
    dashboardRegion,
    dashboardScore,
    dashboardSearch,
  } = useAppSelector(selectDashboard);
  const dispatch = useAppDispatch();

  const [filteredCandidates, setFilteredCandidates] = useState(candidates);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    dispatch(setRegions(regions));
    dispatch(setPositions(positions));
    dispatch(setPosition(positions[0]));
    dispatch(setRegion(regions[0]));
  }, []);

  function applyFilter() {
    setIsOpen(false);
    setFilteredCandidates(
      filterByScore(
        filterCandidates(
          candidates,
          dashboardPosition,
          dashboardRegion,
          dashboardFilterAll,
          dashboardFilterCompleted,
          dashboardFilterPending,
          dashboardFilterFavorite,
          dashboardScore,
          dashboardDisableScore
        ),
        dashboardDisableScore,
        dashboardScore
      )
    );
  }

  return (
    <Layout header="Dashboard">
      <div className="flex items-center justify-between">
        <div
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-center p-1 hover:bg-gray-400 h-8 w-8 hover:rounded-lg hover:shadow-lg cursor-pointer mr-2"
        >
          <FilterIcon className="h-6 w-6 text-gray-700" />
        </div>
        <div className="pr-1 pt-1">
          <input
            value={dashboardSearch}
            onChange={(e) => console.log(e.target.value)}
            type="text"
            placeholder="Search..."
            className="focus:ring-blue-500 focus:border-blue-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
          />
        </div>
      </div>
      <Filter isOpen={isOpen} onClose={() => applyFilter()} applyFilter={() => applyFilter()} />
      <Candidates candidates={filteredCandidates} />
    </Layout>
  );
}

export default DashboardPage;

export const getServerSideProps = async () => {
  // const res = await fetch("/api/templates");
  // const data = await res.json();
  const candidateData: ICandidates[] | undefined = candidates.slice(0, 20);
  const positionData: IPositions[] | undefined = [
    { name: "All positions" },
    { name: "Software Engineer" },
    { name: "Project Manager" },
    { name: "Marketing Manager" },
    { name: "Solution Architect" },
    { name: "Solution Consultant" },
    { name: "Professional Services Project Manager" },
  ];
  const regionData: IRegions[] | undefined = [
    { name: "All regions" },
    { name: "Denmark", code: "DK" },
    { name: "United States", code: "US" },
    { name: "United Kingdom", code: "GB" },
    { name: "Europe", code: "EU" },
  ];

  return {
    props: {
      candidates: candidateData,
      positions: positionData,
      regions: regionData,
    },
  };
};
