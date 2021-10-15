import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import authSlice from "./reducers/authSlice";

const makeStore = () =>
  configureStore({
    reducer: {
      [authSlice.name]: authSlice.reducer,
    },
    devTools: true,
  });

export const wrapper = createWrapper(makeStore);

// import { applyMiddleware, createStore } from "redux";

// import { composeWithDevTools } from "redux-devtools-extension";
// import reducers from "./reducers";
// import thunkMiddleware from "redux-thunk";
// import { useMemo } from "react";

// let store;

// function initStore(initialState) {
//   return createStore(
//     reducers,
//     initialState,
//     composeWithDevTools(applyMiddleware(thunkMiddleware))
//   );
// }

// export const initializeStore = (preloadedState) => {
//   let _store = store ?? initStore(preloadedState);

//   // After navigating to a page with an initial Redux state, merge that state
//   // with the current state in the store, and create a new store
//   if (preloadedState && store) {
//     _store = initStore({
//       ...store.getState(),
//       ...preloadedState,
//     });
//     // Reset the current store
//     store = undefined;
//   }

//   // For SSG and SSR always create a new store
//   if (typeof window === "undefined") return _store;
//   // Create the store once in the client
//   if (!store) store = _store;

//   return _store;
// };

// export function useStore(initialState) {
//   const store = useMemo(() => initializeStore(initialState), [initialState]);
//   return store;
// }
