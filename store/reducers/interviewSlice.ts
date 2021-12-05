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
    // editTask(state, action) {
    //   let newTask = action.payload;
    //   let tasks = state.templateTasks;
    //   tasks.map((task, idx) => {
    //     if (idx === action.payload.order) {
    //       tasks[idx] = newTask;
    //     }
    //   });
    // },
    // removeTask(state, action) {
    //   state.templateTasks = state.templateTasks.filter((item) => item.order !== action.payload);
    // },
    // addChoice(state) {
    //   if (state.templateChoices.length <= 4) {
    //     state.templateChoices = [...state.templateChoices, { value: "", isCorrect: false }];
    //   }
    // },
    // editChoice(state, action) {
    //   let newChoice = action.payload;
    //   let choices = state.templateChoices;
    //   choices.map((choice, idx) => {
    //     if (idx === action.payload._id) {
    //       choices[idx] = newChoice;
    //     }
    //   });
    // },
    // editTaskChoice(state, action) {
    //   let newChoice = action.payload;
    //   let choices = state.templateTask.choices;
    //   if (choices !== undefined) {
    //     choices.map((choice, idx) => {
    //       if (idx === action.payload._id) {
    //         if (choices !== undefined) {
    //           choices[idx] = newChoice;
    //         }
    //       }
    //     });
    //   }
    // },
    // addTaskChoice(state) {
    //   if (state.templateTask.choices !== undefined && state.templateTask.choices.length <= 4) {
    //     state.templateTask.choices = [
    //       ...state.templateTask.choices,
    //       {
    //         _id: state.templateTask.choices.length,
    //         value: "",
    //         isCorrect: false,
    //       },
    //     ];
    //   }
    // },
    // removeChoice(state, action) {
    //   state.templateChoices = state.templateChoices.filter((item) => item._id !== action.payload);
    // },
    // resetTask(state) {
    //   state.templateChoices = initialState.templateChoices;
    //   state.templateTask = initialState.templateTask;
    // },
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
