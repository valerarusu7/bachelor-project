import { HYDRATE } from "next-redux-wrapper";
import { ITask } from "./../../types/index";
import { RootState } from "../store";
import { createSlice } from "@reduxjs/toolkit";

export type TemplateState = {
  templateTasks: ITask[];
  templateTask: ITask;
  showAddTask: boolean;
};

const initialState: TemplateState = {
  templateTasks: [],
  templateTask: { question: "", order: 0, taskType: "" },
  showAddTask: true,
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
    setShow(state, action) {
      state.showAddTask = action.payload;
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

export const { setTasks, setTask, setShow } = templateSlice.actions;
export default templateSlice.reducer;
