import { useEffect, useState } from "react";

import Candidates from "../../components/Dashboard/Candidates";
import Layout from "../../components/Layout/Layout";
import Stat from "../../components/Dashboard/Stat";
import { candidates } from "../../candidates";

function Dashboard({ candidates }) {
  const [filteredCandidates, setFilteredCandidates] = useState(candidates);
  const [activeCandidates, setActiveCandidates] = useState(false);
  const [activeCompleted, setActiveCompleted] = useState(false);
  const [activePending, setActivePending] = useState(false);
  const [activeScore, setActiveScore] = useState(false);
  const [activeFavorites, setActiveFavorites] = useState(false);

  useEffect(() => {
    setActiveCandidates(true);
  }, []);

  function resetStates() {
    setActiveCandidates(false);
    setActiveCompleted(false);
    setActivePending(false);
    setActiveScore(false);
    setActiveFavorites(false);
  }

  function resetCandidates() {
    resetStates();
    setActiveCandidates(true);
    setFilteredCandidates(candidates);
  }

  function filterCompleted() {
    let filteredCompleted = candidates.filter(
      (candidate) => candidate.completed === true
    );
    resetStates();
    setActiveCompleted(true);
    setFilteredCandidates(filteredCompleted);
  }

  function filterPending() {
    let filteredPending = candidates.filter(
      (candidate) => candidate.completed === false
    );
    resetStates();
    setActivePending(true);
    setFilteredCandidates(filteredPending);
  }

  function filterPerfectMatches() {
    let filteredPerfectMatch = candidates.filter(
      (candidate) => candidate.score > 90
    );
    resetStates();
    setActiveScore(true);
    setFilteredCandidates(filteredPerfectMatch);
  }

  function filterFavorites() {
    let filteredFavorites = candidates.filter(
      (candidate) => candidate.favorite === true
    );
    resetStates();
    setActiveFavorites(true);
    setFilteredCandidates(filteredFavorites);
  }

  return (
    <Layout>
      <div className="grid 2xl:grid-cols-5 xl:grid-cols-2 lg:grid-cols-1">
        <Stat
          value={12}
          name="Total Condidates"
          onClick={() => resetCandidates()}
          type="candidates"
          active={activeCandidates}
        />
        <Stat
          value={9}
          name="completed"
          onClick={() => filterCompleted()}
          type="completed"
          active={activeCompleted}
        />
        <Stat
          value={3}
          name="pending"
          onClick={() => filterPending()}
          type="pending"
          active={activePending}
        />
        <Stat
          value={4}
          name="perfect matches"
          onClick={() => filterPerfectMatches()}
          type="perfectScore"
          active={activeScore}
        />
        <Stat
          value={3}
          name="favorites"
          onClick={() => filterFavorites()}
          type="favorites"
          active={activeFavorites}
        />
      </div>
      <Candidates
        candidates={filteredCandidates}
        activeCandidates={activeCandidates}
        activePending={activePending}
        activeCompleted={activeCompleted}
        activeScore={activeScore}
        activeFavorites={activeFavorites}
      />
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
    },
  };
};
