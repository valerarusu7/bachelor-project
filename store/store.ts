import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";

import dashboardSlice from "./reducers/dashboardSlice";
import templateSlice from "./reducers/template";

export const store = configureStore({
  reducer: {
    dashboard: dashboardSlice,
    template: templateSlice,
  },
  devTools: false,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
