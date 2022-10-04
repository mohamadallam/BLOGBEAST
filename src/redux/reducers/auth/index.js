import { createSlice } from "@reduxjs/toolkit";
import { Push } from "../notify";
import axios from "../../../axios";
import { getItemFromLocalStorage, apiError } from "../../../utils";

export const initialState = {
  token: getItemFromLocalStorage("token"),
  redirect: null,
  user: getItemFromLocalStorage("user"),
  error: null,
  loading: false,
};

const SiteSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setRedirect: (state, { payload }) => {
      state.redirect = payload;
      return state;
    },
    setError: (state, { payload }) => {
      state.error = payload;
      return state;
    },
    setLoading: (state, { payload }) => {
      state.loading = payload;
      return state;
    },
    setAuth: (state, { payload }) => {
      state.token = payload.token;
      state.user = payload.user;
      return state;
    },
    Logout: (state) => {
      state = { ...initialState, token: null, user: null };
      return state;
    },
  },
});

export const signOut = () => {
  return async (dispatch) => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(Logout());
  };
};

export const signIn = ({ username, password }) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const { data } = await axios.post("/auth/signin", {
        username,
        password,
      });
      const token = data?.accessToken;
      const user = { username };
      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem("user", JSON.stringify(user));
      dispatch(setAuth({ token, user }));
      dispatch(setError(null));
      dispatch(
        Push({ message: "welcome back, " + username, variant: "success" })
      );
    } catch (err) {
      // 401
      const error = apiError(err);
      dispatch(setError(error));
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const {
  setAuth,
  Logout,
  setRedirect,
  setError,
  setLoading,
} = SiteSlice.actions;
export default SiteSlice.reducer;
