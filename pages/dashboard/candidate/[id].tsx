import { GetServerSideProps } from "next";
import { ICandidate, ICandidateProps, IParams } from "../../../types";

import Candidate from "../../../models/Candidate";
import CandidateInfo from "../../../components/CandidateDetails/Timeline/CandidateInfo";
import CandidateTimeline from "../../../components/CandidateDetails/Timeline/CandidateTimeline";
import Layout from "../../../components/Layout/Layout";
import connectDB from "../../../utils/mongodb";

function CandidateDetails({ candidate }: ICandidateProps) {
  const candidateData = JSON.parse(candidate);
  return (
    <Layout header="Candidate Details">
      <div className="grid grid-cols-6 mt-10 ">
        <div className="col-span-4 flex flex-col ">
          <CandidateInfo candidate={candidateData} />
        </div>
        <div className="col-span-2 bg-white rounded-lg shadow-lg p-2 h-auto border border-gray-300">
          <CandidateTimeline candidate={candidateData} />
        </div>
      </div>
    </Layout>
  );
}

export default CandidateDetails;

export const getServerSideProps: GetServerSideProps = async (context) => {
  await connectDB();
  const { id } = context.params as IParams;

  const candidate: ICandidate = await Candidate.findOne({ _id: id }).lean();

  return {
    props: { candidate: JSON.stringify(candidate) },
  };
};
