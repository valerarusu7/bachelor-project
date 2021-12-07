import Layout from "../../components/Layout/Layout";
import PositionList from "../../components/Positions/PositionList";
import { IPositionsProps, IPosition, IAccessTokenPayload } from "../../types";
import JobPosition from "../../models/JobPosition";
import protect from "../../helpers/protect";
import { GetServerSideProps, NextApiRequest, NextApiResponse } from "next";

function Positions({ positions }: IPositionsProps) {
  return (
    <Layout header="Positions">
      <PositionList positions={positions} />
    </Layout>
  );
}

export default Positions;

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

  const jobPositions: IPosition[] = await JobPosition.find({
    companyId: (protection.payload as IAccessTokenPayload).companyId,
  })
    .select("_id name location type recruitingStartDate")
    .lean();

  return {
    props: {
      positions: JobPosition.toClientArray(jobPositions),
    },
  };
};
