import Layout from "../../components/Layout/Layout";
import PositionList from "../../components/Positions/PositionList";
import { IPositionsProps, IPosition, IServerProps } from "../../types";
import JobPosition from "../../models/JobPosition";
import connectDB from "../../utils/mongodb";
import protect from "../../helpers/protect";

function Positions({ positions }: IPositionsProps) {
  return (
    <Layout header="Positions">
      <PositionList positions={positions} />
    </Layout>
  );
}

export default Positions;

export const getServerSideProps = async ({ req }: IServerProps) => {
  if (!protect(req.cookies["accessToken"]).status) {
    return {
      redirect: {
        permanent: false,
        destination: "/auth/login",
      },
    };
  }

  await connectDB();

  const jobPositions: IPosition[] = await JobPosition.find({})
    .select("_id name location type recruitingStartDate")
    .lean();

  return {
    props: {
      positions: JobPosition.toClient(jobPositions),
    },
  };
};
