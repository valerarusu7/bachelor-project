import { combineReducers } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/lib/persistReducer";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import authSlice from "./reducers/authSlice";

import dashboardSlice from "./reducers/dashboardSlice";
import interviewSlice from "./reducers/interviewSlice";
import templateSlice from "./reducers/template";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};
const reducers = combineReducers({
  dashboard: dashboardSlice,
  template: templateSlice,
  interview: interviewSlice,
  auth: authSlice,
});

export default persistReducer(persistConfig, reducers);
