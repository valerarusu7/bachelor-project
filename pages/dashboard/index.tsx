import {
  ICandidate,
  IDashboardProps,
  IPositions,
  IRegions,
  IAccessTokenPayload,
} from "../../types";
import { filterByScore, filterCandidates } from "../../helpers/filters";
import {
  selectDashboard,
  setPosition,
  setPositions,
  setRegion,
  setRegions,
} from "../../store/reducers/dashboardSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect, useState } from "react";

import { BsSliders } from "react-icons/bs";
import Candidate from "../../models/Candidate";
import Candidates from "../../components/Dashboard/Candidates";
import CustomButton from "../../components/common/CustomButton";
import Filter from "../../components/Dashboard/Filter";
import Layout from "../../components/Layout/Layout";
import protect from "../../helpers/protect";
import { GetServerSideProps, NextApiRequest, NextApiResponse } from "next";

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
      <div className="flex items-center justify-between ">
        <CustomButton onClick={() => setIsOpen(true)} color="blue">
          <div className="text-white flex justify-center items-center">
            <BsSliders className="h-4 w-4 mr-2" />
            <p>Filters</p>
          </div>
        </CustomButton>
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
      <Filter
        isOpen={isOpen}
        onClose={() => applyFilter()}
        applyFilter={() => applyFilter()}
      />
      <Candidates candidates={filteredCandidates} />
    </Layout>
  );
}

export default DashboardPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const protection = await protect(
    context.req as NextApiRequest,
    context.res as NextApiResponse
  );
  if (!protection.status && !protection.payload) {
    return {
      redirect: {
        permanent: false,
        destination: "/auth/login",
      },
    };
  }

  const candidates: ICandidate[] = await Candidate.find({
    companyId: (protection.payload as IAccessTokenPayload).companyId,
  })
    .populate({
      path: "interviews.jobId",
      select: "name",
    })
    .lean();

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
      candidates: Candidate.toClientArray(candidates),
      positions: positionData,
      regions: regionData,
    },
  };
};
