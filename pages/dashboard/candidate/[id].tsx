import { GetStaticPaths, GetStaticProps } from "next";
import { ICandidate, ICandidateProps, IParams } from "../../../types";

import Candidate from "../../../models/Candidate";
import CandidateInfo from "../../../components/CandidateDetails/Timeline/CandidateInfo";
import CandidateTimeline from "../../../components/CandidateDetails/Timeline/CandidateTimeline";
import Layout from "../../../components/Layout/Layout";
import connectDB from "../../../utils/mongodb";

function CandidateDetails({ candidate }: ICandidateProps) {
  return (
    <Layout header="Candidate Details">
      <div className="grid grid-cols-6 mt-10 ">
        <div className="col-span-4 flex flex-col ">
          <CandidateInfo candidate={candidate} />
        </div>
        <div className="col-span-2 bg-white rounded-lg shadow-lg p-2 h-auto border border-gray-300">
          <CandidateTimeline candidate={candidate} />
        </div>
      </div>
    </Layout>
  );
}

export default CandidateDetails;

export const getStaticPaths: GetStaticPaths = async () => {
  await connectDB();
  const candidates: ICandidate[] = await Candidate.find({}).lean();

  const paths = candidates.map((candidate) => {
    return {
      params: { id: candidate._id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  await connectDB();
  const { id } = context.params as IParams;

  const candidate: ICandidate = await Candidate.findById(id).lean();

  return {
    props: {
      candidate: Candidate.toClientObject(candidate),
    },
    revalidate: 5,
  };
};
