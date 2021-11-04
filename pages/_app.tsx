import "tailwindcss/tailwind.css";

import Head from "next/head";
import type { AppProps } from "next/app";
import { store } from "../store/store";
import { Provider } from "react-redux";

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Head>
        {/*…script and meta tags*/}
        <title>Eligo</title>
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}

export default App;
