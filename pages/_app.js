import "tailwindcss/tailwind.css";

import { wrapper } from "../store/store";
import Head from "next/head";

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/*…script and meta tags*/}
        <title>Eligo</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default wrapper.withRedux(App);
