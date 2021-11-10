import { IChoice, ITask } from "./../../types/index";

import { HYDRATE } from "next-redux-wrapper";
import { RootState } from "../store";
import { createSlice } from "@reduxjs/toolkit";

export type TemplateState = {
  templateTasks: ITask[];
  templateTaskType?: string;
  showModal: boolean;
  templateChoices: IChoice[];
};

const initialState: TemplateState = {
  templateTasks: [],
  showModal: false,
  templateChoices: [
    { value: "", isCorrect: false },
    { value: "", isCorrect: false },
  ],
};

export const templateSlice = createSlice({
  name: "template",
  initialState,
  reducers: {
    setTasks(state, action) {
      state.templateTasks = action.payload;
    },
    setTaskType(state, action) {
      state.templateTaskType = action.payload;
    },
    setShow(state, action) {
      state.showModal = action.payload;
      state.templateChoices = initialState.templateChoices;
    },
    setChoices(state, action) {
      state.templateChoices = action.payload;
    },
    addChoice(state) {
      if (state.templateChoices.length <= 4) {
        state.templateChoices = [
          ...state.templateChoices,
          { value: "", isCorrect: false },
        ];
      }
    },
    editChoice(state, action) {
      let newChoice = action.payload;
      let choices = state.templateChoices;
      choices.map((choice, idx) => {
        if (idx === action.payload._id) {
          choices[idx] = newChoice;
        }
      });
    },
    removeChoice(state, action) {
      state.templateChoices = state.templateChoices.filter(
        (item) => item._id !== action.payload
      );
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

export const selectTemplate = (state: RootState) => state.template;

export const {
  setTasks,
  setTaskType,
  setShow,
  setChoices,
  addChoice,
  editChoice,
  removeChoice,
} = templateSlice.actions;
export default templateSlice.reducer;
