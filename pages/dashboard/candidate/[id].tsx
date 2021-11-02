import CandidateInfo from "../../../components/CandidateDetails/Timeline/CandidateInfo";
import CandidateTimeline from "../../../components/CandidateDetails/Timeline/CandidateTimeline";
import Layout from "../../../components/Layout/Layout";
import candidates from "../../../candidates.json";
import { ParsedUrlQuery } from "querystring";
import { GetStaticPaths, GetStaticProps } from "next";
import { ICandidateProps } from "../../../types";

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
  //   const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = candidates;

  const paths = data.map((candidate) => {
    return {
      params: { id: candidate.id.toString() },
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
  const { id } = context.params as IParams;
  //   const res = await fetch("https://jsonplaceholder.typicode.com/users/" + id);
  const data = candidates[parseInt(id) - 1];

  return {
    props: { candidate: data },
  };
};
