import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { RootState } from "../store";

export type DashboardState = {
  dashboardPositions: [{ name: string }];
  dashboardRegions: [{ name: string }];
  dashboardPosition: unknown;
  dashboardRegion: unknown;
  dashboardFilterAll: boolean;
  dashboardFilterCompleted: boolean;
  dashboardFilterPending: boolean;
  dashboardFilterFavorite: boolean;
  dashboardScore: [number, number];
  dashboardDisableScore: boolean;
  dashboardSearch: string;
};

const initialState: DashboardState = {
  dashboardPositions: [{ name: "All positions" }],
  dashboardRegions: [{ name: "All regions" }],
  dashboardPosition: { name: "All positions" },
  dashboardRegion: { name: "All regions" },
  dashboardFilterAll: true,
  dashboardFilterCompleted: false,
  dashboardFilterPending: false,
  dashboardFilterFavorite: false,
  dashboardScore: [0, 100],
  dashboardDisableScore: true,
  dashboardSearch: "",
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setPositions(state, action) {
      state.dashboardPositions = action.payload;
    },
    setPosition(state, action) {
      state.dashboardPosition = action.payload;
    },
    setRegions(state, action) {
      state.dashboardRegions = action.payload;
    },
    setRegion(state, action) {
      state.dashboardRegion = action.payload;
    },
    setFilterAll(state, action) {
      state.dashboardFilterAll = action.payload;
    },
    setFilterCompleted(state, action) {
      state.dashboardFilterCompleted = action.payload;
    },
    setFilterPending(state, action) {
      state.dashboardFilterPending = action.payload;
    },
    setFilterFavorite(state, action) {
      state.dashboardFilterFavorite = action.payload;
    },
    setScore(state, action) {
      state.dashboardScore = action.payload;
    },
    setDisableScore(state, action) {
      state.dashboardDisableScore = action.payload;
    },
    setSearch(state, action) {
      state.dashboardSearch = action.payload;
    },
    resetfilters(state) {
      state.dashboardFilterAll = false;
      state.dashboardFilterCompleted = false;
      state.dashboardFilterFavorite = false;
      state.dashboardFilterPending = false;
    },
    resetState(state) {
      state.dashboardFilterAll = true;
      state.dashboardFilterCompleted = false;
      state.dashboardFilterPending = false;
      state.dashboardFilterFavorite = false;
      state.dashboardScore = [0, 100];
      state.dashboardDisableScore = true;
      state.dashboardSearch = "";
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

export const selectDashboard = (state: RootState) => state.dashboard;

export const {
  setPositions,
  setPosition,
  setRegions,
  setRegion,
  setFilterAll,
  setFilterCompleted,
  setFilterPending,
  setFilterFavorite,
  setScore,
  setDisableScore,
  setSearch,
  resetfilters,
  resetState,
} = dashboardSlice.actions;
export default dashboardSlice.reducer;
