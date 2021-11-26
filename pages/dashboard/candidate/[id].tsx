import { GetStaticPaths, GetStaticProps } from "next";
import {
  ICandidate,
  ICandidateDocument,
  ICandidateProps,
  IParams,
} from "../../../types";

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

  const paths = candidates
    .flatMap((candidate) => candidate.interviews)
    .map((candidateInterview) => {
      return {
        params: { id: candidateInterview._id.toString() },
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

  const candidate: ICandidateDocument = await Candidate.findOne(
    {
      "interviews._id": id,
    },
    "interviews.$"
  ).lean();
  console.log(candidate);
  var serializedCandidate = await Candidate.toClient(candidate);
  return {
    props: { candidate: serializedCandidate },
    revalidate: 5,
  };
};
