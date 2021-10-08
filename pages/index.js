import Head from "next/head";
import Layout from "../components/Layout/Layout";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Inteview Platform</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <main>Home</main>
      </Layout>
    </div>
  );
}
