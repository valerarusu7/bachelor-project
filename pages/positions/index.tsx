import Layout from "../../components/Layout/Layout";
import PositionList from "../../components/Positions/PositionList";
import { IPosition, IPositionsProps } from "../../types";
import { baseUrl } from "../../config";

function Positions({ positions }: IPositionsProps) {
  return (
    <Layout header="Positions">
      <PositionList positions={positions} />
    </Layout>
  );
}

export default Positions;

export const getServerSideProps = async () => {
  const res = await fetch(`${baseUrl}/api/positions`);
  const data = await res.json();
  const positionData: IPosition[] = data;
  return {
    props: {
      positions: positionData,
    },
  };
};
