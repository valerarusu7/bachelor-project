import {
  Action,
  configureStore,
  ThunkAction,
} from '@reduxjs/toolkit';
import dashboardSlice from './reducers/dashboardSlice';

export const store = configureStore({
  reducer: {
    dashboard: dashboardSlice
  },
  devTools: false
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
   ReturnType,
   RootState,
   unknown,
   Action<string>
 >;
