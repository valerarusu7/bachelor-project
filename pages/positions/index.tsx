import Layout from "../../components/Layout/Layout";
import PositionList from "../../components/Positions/PositionList";
import { IPositionsProps } from "../../types";
import JobPosition from "../../models/JobPosition";
import connectDB from "../../utils/mongodb";

function Positions({ positions }: IPositionsProps) {
  return (
    <Layout header="Positions">
      <PositionList positions={positions} />
    </Layout>
  );
}

export default Positions;

export const getServerSideProps = async () => {
  await connectDB();
  const jobPositions = await JobPosition.find({})
    .select("_id name location type recruitingStartDate")
    .lean();
  const positionsData = jobPositions.map((position) => {
    position.recruitingStartDate = position.recruitingStartDate.toString();
    if (position.location === undefined) {
      position.location = null;
    }
    return position;
  });
  return {
    props: {
      positions: positionsData,
    },
  };
};
