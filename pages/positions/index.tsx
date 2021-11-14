import Layout from "../../components/Layout/Layout";
import PositionList from "../../components/Positions/PositionList";
import { IPositionsProps } from "../../types";
import JobPosition from "../../models/JobPosition";
import connectDB from "../../utils/mongodb";

function Positions({ positions }: IPositionsProps) {
  const positionsData = JSON.parse(positions);
  return (
    <Layout header="Positions">
      <PositionList positions={positionsData} />
    </Layout>
  );
}

export default Positions;

export const getServerSideProps = async () => {
  await connectDB();

  const jobPositions = await JobPosition.find({})
    .select("_id name location type recruitingStartDate")
    .lean();

  return {
    props: {
      positions: JSON.stringify(jobPositions),
    },
  };
};
