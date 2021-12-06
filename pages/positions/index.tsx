import Layout from "../../components/Layout/Layout";
import PositionList from "../../components/Positions/PositionList";
import { IPositionsProps, IPosition, IServerProps, IUserTokenPayload } from "../../types";
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
  const protection = protect(req.cookies["accessToken"]);
  if (!protection.status) {
    return {
      redirect: {
        permanent: false,
        destination: "/auth/login",
      },
    };
  }

  await connectDB();

  const jobPositions: IPosition[] = await JobPosition.find({
    companyId: (protection.payload as IUserTokenPayload).companyId,
  })
    .select("_id name location type recruitingStartDate")
    .lean();

  return {
    props: {
      positions: JobPosition.toClientArray(jobPositions),
    },
  };
};
