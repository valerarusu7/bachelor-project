import Head from "next/head";
import Landing from "../components/Landing Page/Landing";
import Layout from "../components/Layout/Layout";
import Table from "../components/Dashboard/Table/Table";
import { candidates } from "../candidates";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Inteview Platform</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <main>
          <Landing />
          {/* <Table /> */}
        </main>
      </div>
    </div>
  );
}
