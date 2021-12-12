import { ICandidate, IChoice, ITask } from "./../../types/index";

import { HYDRATE } from "next-redux-wrapper";
import { RootState } from "../store";
import { createSlice } from "@reduxjs/toolkit";

export type InterviewState = {
  currentTask: ITask | undefined;
  completedTask: ITask[] | undefined;
};

const initialState: InterviewState = {
  currentTask: undefined,
  completedTask: undefined,
};

export const interviewSlice = createSlice({
  name: "interviewSlice",
  initialState,
  reducers: {
    setCurrentTask(state, action) {
      state.currentTask = action.payload;
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      console.log("HYDRATE", state, action.payload);
      return {
        ...state,
        ...action.payload.auth,
      };
    },
  },
});

export const selectInterview = (state: RootState) => state.interview;

export const { setCurrentTask } = interviewSlice.actions;
export default interviewSlice.reducer;
