import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

export const authSlice = createSlice({
  name: "auth",

  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    register_success: false,
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

export const loadUser = () => async (dispatch) => {
  try {
    const res = await fetch("/api/account/user", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    const data = await res.json();

    if (res.status === 200) {
      dispatch(setUser(data));
    }
  } catch (error) {
    console.log(error);
  }
};

export const checkAuthStatus = () => async (dispatch) => {
  try {
    const res = await fetch("/api/account/verify", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (res.status === 200) {
      dispatch(setIsAuthenticated(true));
      dispatch(loadUser());
    } else {
      dispatch(setIsAuthenticated(false));
    }
  } catch (error) {
    console.log(error);
  }
};

export const requestRefresh = () => async (dispatch) => {
  try {
    const res = await fetch("/api/account/refresh", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (res.status === 200) {
      dispatch(checkAuthStatus());
    } else {
      dispatch(setIsAuthenticated(false));
      dispatch(setUser(null));
    }
  } catch (error) {
    console.log(error);
  }
};

export const register =
  (company_name, company_website, first_name, last_name, email, password, re_password, withCompany) => async (dispatch) => {
    const bodyWithCompany = JSON.stringify({
      company: { company_name, company_website },
      user: { first_name, last_name, email, password, re_password },
    });
    const body = JSON.stringify({ first_name, last_name, email, password, re_password });
    dispatch(setLoading(true));
    try {
      // const res = await fetch("/api/account/register", {
      //   method: "POST",
      //   headers: {
      //     Accept: "application/json",
      //     "Content-Type": "application/json",
      //   },
      //   body: withCompany ? bodyWithCompany : body,
      // });

      // if (res.status === 201) {
      //   dispatch(setRegisterSuccess(true));
      // } else {
      //   dispatch(setRegisterSuccess(false));
      // }
      console.log(withCompany ? bodyWithCompany : body);
      setTimeout(() => {}, 2000);
    } catch (error) {
      console.log(error);
    }

    dispatch(setLoading(false));
  };

export const reset_register_success = () => (dispatch) => {
  dispatch(setRegisterSuccess(false));
};

export const login = (username, password) => async (dispatch) => {
  const body = JSON.stringify({
    username,
    password,
  });

  dispatch(setLoading(true));

  try {
    const res = await fetch("/api/account/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: body,
    });

    if (res.status === 200) {
      dispatch(setIsAuthenticated(true));
      dispatch(loadUser());
    } else {
      dispatch(setIsAuthenticated(false));
    }
  } catch (error) {
    console.log(error);
    dispatch(setIsAuthenticated(false));
  }

  dispatch(setLoading(false));
};

export const logout = () => async (dispatch) => {
  try {
    const res = await fetch("/api/account/logout", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    });

    if (res.status === 200) {
      dispatch(setIsAuthenticated(false));
      dispatch(setUser(null));
    }
  } catch (error) {
    console.log(error);
    dispatch(setIsAuthenticated(false));
  }
};
