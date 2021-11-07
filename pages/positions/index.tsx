import Layout from "../../components/Layout/Layout";
import PositionList from "../../components/Positions/PositionList";
import { IPosition, IPositionsProps } from "../../types";
import absoluteUrl from "next-absolute-url";
import { NextPageContext } from "next";

function Positions({ positions }: IPositionsProps) {
  return (
    <Layout header="Positions">
      <PositionList positions={positions} />
    </Layout>
  );
}

export default Positions;

export const getServerSideProps = async ({ req }: NextPageContext) => {
  const { origin } = absoluteUrl(req);
  const res = await fetch(`${origin}/api/positions`);
  const positionData: IPosition[] = await res.json();
  return {
    props: {
      positions: positionData,
    },
  };
};
