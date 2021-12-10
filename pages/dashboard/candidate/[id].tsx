import { GetServerSideProps, NextApiRequest, NextApiResponse } from "next";
import { ICandidate, ICandidateProps } from "../../../types";

import Candidate from "../../../models/Candidate";
import CandidateInfo from "../../../components/CandidateDetails/Timeline/CandidateInfo";
import CandidateTimeline from "../../../components/CandidateDetails/Timeline/CandidateTimeline";
import Layout from "../../../components/Layout/Layout";
import protect from "../../../helpers/protect";
import CandidateVideoInterview from "../../../models/CandidateVideoInterview";
import CandidateComment from "../../../models/CandidateComment";

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

  const id = context.params?.id;

  // @ts-ignore
  const [candidate, videoInterview, comments]: [
    ICandidate,
    // @ts-ignore
    ICandidateVideoInterview,
    // @ts-ignore
    ICandidateComment[]
  ] = await Promise.all([
    Candidate.findById(id).lean(),
    CandidateVideoInterview.findOne({ candidateId: id }).lean(),
    CandidateComment.find({ candidateId: id }).lean(),
  ]);

  console.log(candidate);
  console.log(videoInterview);
  console.log(comments);

  return {
    props: {
      candidate: Candidate.toClientObject(candidate),
    },
  };
};
