import Layout from "../../components/Layout/Layout";
import PositionList from "../../components/Positions/PositionList";
import { positions } from "../../positions";
import { IPosition, IPositionsProps } from "../../types";

function Positions({ positions }: IPositionsProps) {
  return (
    <Layout header="Positions">
      <PositionList positions={positions} />
    </Layout>
  );
}

export default Positions;

export const getServerSideProps = async () => {
  // const res = await fetch("/api/templates");
  // const data = await res.json();
  const positionData: IPosition[] = positions;
  return {
    props: {
      positions: positionData,
    },
  };
};
