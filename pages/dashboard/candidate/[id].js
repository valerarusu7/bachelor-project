import CandidateInfo from "../../../components/CandidateDetails/Timeline/CandidateInfo";
import CandidateTimeline from "../../../components/CandidateDetails/Timeline/CandidateTimeline";
import Layout from "../../../components/Layout/Layout";
import candidates from "../../../candidates.json";

function CandidateDetails({ candidate }) {
  return (
    <Layout header="Candidate Details">
      <div className="grid grid-cols-6 mt-10 grid-rows-2 ">
        <div className="col-span-4 flex flex-col row-span-2">
          <CandidateInfo candidate={candidate} />
        </div>
        <div className="col-span-2 bg-white rounded-lg shadow-lg p-2 row-span-1  h-auto">
          <CandidateTimeline candidate={candidate} />
        </div>
      </div>
    </Layout>
  );
}

export default CandidateDetails;

export const getStaticPaths = async () => {
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

export const getStaticProps = async (context) => {
  const id = context.params.id;
  //   const res = await fetch("https://jsonplaceholder.typicode.com/users/" + id);
  const data = candidates[id - 1];

  return {
    props: { candidate: data },
  };
};
