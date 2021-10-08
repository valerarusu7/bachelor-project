import Layout from "../../components/Layout/Layout";
import PositionList from "../../components/Positions/PositionList";
import { positions } from "../../positions";

function Positions({ positions }) {
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

  return {
    props: {
      positions: positions,
    },
  };
};
