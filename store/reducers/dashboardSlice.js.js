import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

export const dashboardSlice = createSlice({
  name: "dashboard",

  initialState: {
    positions: [{ name: "All positions" }],
    regions: [{ name: "All regions" }],
    position: positions[0],
    region: regions[0],
    filterAll: true,
    filterCompleted: false,
    filterPending: false,
    filterFavorite: false,
    score: [0, 100],
    disableScore: true,
    search: "",
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setIsAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setRegisterSuccess(state, action) {
      state.register_success = action.payload;
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

export default authSlice;
export const { setUser, setIsAuthenticated, setLoading, setRegisterSuccess } = authSlice.actions;
