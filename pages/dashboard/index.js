import { useState } from "react";

import Candidates from "../../components/Dashboard/Candidates";
import Layout from "../../components/Layout/Layout";
import candidates from "../../candidates.json";
import Filter from "../../components/Dashboard/Filter";
import { filterByScore, filterCandidates } from "../../helpers/filters";
import { FilterIcon } from "@heroicons/react/solid";

function Dashboard({ candidates, positions, regions }) {
  const [filteredCandidates, setFilteredCandidates] = useState(candidates);
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState({
    position: positions[0],
    filterAll: true,
    filterCompleted: false,
    filterPending: false,
    filterFavorite: false,
    score: [0, 100],
    disableScore: true,
    region: regions[0],
  });

  function applyFilter() {
    setIsOpen(false);
    setFilteredCandidates(filterByScore(filterCandidates(candidates, filter), filter));
  }

  function resetFilters() {
    setFilter({
      position: positions[0],
      filterAll: true,
      filterCompleted: false,
      filterPending: false,
      filterFavorite: false,
      score: [0, 100],
      disableScore: true,
      region: regions[0],
    });
  }

  function resetStates() {
    setFilter((prevState) => {
      return { ...prevState, filterAll: false, filterCompleted: false, filterPending: false, filterFavorite: false };
    });
  }

  function resetCandidates() {
    resetStates();
    setFilter((prevState) => {
      return { ...prevState, filterAll: true };
    });
  }

  function filterCompleted() {
    resetStates();
    setFilter((prevState) => {
      return { ...prevState, filterCompleted: true };
    });
  }

  function filterPending() {
    resetStates();
    setFilter((prevState) => {
      return { ...prevState, filterPending: true };
    });
  }

  function filterFavorites() {
    resetStates();
    setFilter((prevState) => {
      return { ...prevState, filterFavorite: true };
    });
  }

  return (
    <Layout header="Dashboard">
      <div
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center p-1 hover:bg-gray-400 h-8 w-8 hover:rounded-lg hover:shadow-lg cursor-pointer"
      >
        <FilterIcon className="h-6 w-6 text-gray-700" />
      </div>
      <Filter
        positions={positions}
        regions={regions}
        activeCandidates={filter.filterAll}
        activePending={filter.filterPending}
        activeCompleted={filter.filterCompleted}
        activeFavorites={filter.filterFavorite}
        setActiveCandidates={() => resetCandidates()}
        setActiveCompleted={() => filterCompleted()}
        setActivePending={() => filterPending()}
        setActiveFavorites={() => filterFavorites()}
        filter={filter}
        selectedPosition={filter.position}
        setSelectedPosition={(e) =>
          setFilter((prevState) => {
            return { ...prevState, position: e };
          })
        }
        selectedRegion={filter.region}
        setSelectedRegion={(e) =>
          setFilter((prevState) => {
            return { ...prevState, region: e };
          })
        }
        score={filter.score}
        disableScore={filter.disableScore}
        setDisableScore={() =>
          setFilter((prevState) => {
            return { ...prevState, disableScore: !filter.disableScore };
          })
        }
        setScore={(e) =>
          setFilter((prevState) => {
            return { ...prevState, score: e.target.value };
          })
        }
        isOpen={isOpen}
        onClose={() => applyFilter()}
        applyFilter={() => applyFilter()}
        resetFilters={() => resetFilters()}
      />
      <Candidates candidates={filteredCandidates} />
    </Layout>
  );
}

export default Dashboard;

export const getServerSideProps = async () => {
  // const res = await fetch("/api/templates");
  // const data = await res.json();

  return {
    props: {
      candidates: candidates,
      positions: [
        { name: "All positions" },
        { name: "Software Engineer" },
        { name: "Project Manager" },
        { name: "Marketing Manager" },
        { name: "Solution Architect" },
        { name: "Solution Consultant" },
        { name: "Professional Services Project Manager" },
      ],
      regions: [
        { name: "All regions" },
        { name: "Denmark", code: "DK" },
        { name: "United States", code: "US" },
        { name: "United Kingdom", code: "GB" },
        { name: "Europe", code: "EU" },
      ],
    },
  };
};
