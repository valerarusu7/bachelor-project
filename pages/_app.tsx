import "tailwindcss/tailwind.css";

import Head from "next/head";
import type { AppProps } from "next/app";
import { store } from "../store/store";
import { persistor } from "../store/store";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Head>
          {/*…script and meta tags*/}
          <title>Eligo</title>
        </Head>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

export default App;
