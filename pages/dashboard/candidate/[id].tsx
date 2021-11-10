import { GetStaticPaths, GetStaticProps } from "next";
import { ICandidate, ICandidateProps } from "../../../types";

import Candidate from "../../../models/Candidate";
import CandidateInfo from "../../../components/CandidateDetails/Timeline/CandidateInfo";
import CandidateTimeline from "../../../components/CandidateDetails/Timeline/CandidateTimeline";
import Layout from "../../../components/Layout/Layout";
import { ParsedUrlQuery } from "querystring";
import connectDB from "../../../utils/mongodb";

function CandidateDetails({ candidate }: ICandidateProps) {
  return (
    <Layout header="Candidate Details">
      <div className="grid grid-cols-6 mt-10 ">
        <div className="col-span-4 flex flex-col ">
          <CandidateInfo candidate={candidate} />
        </div>
        <div className="col-span-2 bg-white rounded-lg shadow-lg p-2 h-auto">
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

interface IParams extends ParsedUrlQuery {
  id: string;
}

export const getStaticProps: GetStaticProps = async (context) => {
  await connectDB();
  const { id } = context.params as IParams;
  const candidate: ICandidate = await Candidate.findOne({ _id: id }).lean();
  candidate._id = candidate._id.toString();
  if (candidate.startedUtc !== undefined) {
    candidate.startedUtc = candidate.startedUtc.toString();
  }
  if (candidate.completedUtc !== undefined) {
    candidate.completedUtc = candidate.completedUtc.toString();
  }

  candidate.companyId = candidate.companyId.toString();

  return {
    props: { candidate: candidate },
  };
};
