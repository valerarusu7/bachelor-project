import { IChoice, ITask } from "./../../types/index";

import { HYDRATE } from "next-redux-wrapper";
import { RootState } from "../store";
import { createSlice } from "@reduxjs/toolkit";

export type TemplateState = {
  templateTasks: ITask[];
  templateTask: ITask;
  templateTaskType?: string;
  showModal: boolean;
  templateChoices: IChoice[];
  edit: boolean;
};

const initialState: TemplateState = {
  templateTasks: [],
  templateTask: { question: "", taskType: "", order: 0 },
  showModal: false,
  templateChoices: [
    { value: "", isCorrect: false },
    { value: "", isCorrect: false },
  ],
  edit: false,
};

export const templateSlice = createSlice({
  name: "template",
  initialState,
  reducers: {
    setTasks(state, action) {
      state.templateTasks = action.payload;
    },
    setTask(state, action) {
      state.templateTask = action.payload;
    },
    setEdit(state, action) {
      state.edit = action.payload;
    },
    editTask(state, action) {
      let newTask = action.payload;
      let tasks = state.templateTasks;
      tasks.map((task, idx) => {
        if (idx === action.payload.order) {
          tasks[idx] = newTask;
        }
      });
    },
    removeTask(state, action) {
      state.templateTasks = state.templateTasks.filter((item) => item.order !== action.payload);
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
        state.templateChoices = [...state.templateChoices, { value: "", isCorrect: false }];
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
    editTaskChoice(state, action) {
      let newChoice = action.payload;
      let choices = state.templateTask.choices;
      if (choices !== undefined) {
        choices.map((choice, idx) => {
          if (idx === action.payload._id) {
            if (choices !== undefined) {
              choices[idx] = newChoice;
            }
          }
        });
      }
    },
    addTaskChoice(state) {
      if (state.templateTask.choices !== undefined && state.templateTask.choices.length <= 4) {
        state.templateTask.choices = [
          ...state.templateTask.choices,
          {
            _id: state.templateTask.choices.length,
            value: "",
            isCorrect: false,
          },
        ];
      }
    },
    removeChoice(state, action) {
      state.templateChoices = state.templateChoices.filter((item) => item._id !== action.payload);
    },
    resetTask(state) {
      state.templateChoices = initialState.templateChoices;
      state.templateTask = initialState.templateTask;
    },
    resetTemplateState() {
      return initialState;
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
  setTask,
  setEdit,
  editTask,
  removeTask,
  setTaskType,
  addTaskChoice,
  setShow,
  setChoices,
  editTaskChoice,
  addChoice,
  editChoice,
  removeChoice,
  resetTask,
  resetTemplateState,
} = templateSlice.actions;
export default templateSlice.reducer;
