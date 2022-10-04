import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  loading: false,
  error: null,
  name: "BLOGBEAST",
};

const SiteSlice = createSlice({
  name: "Site",
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setError: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export const { setLoading, setError } = SiteSlice.actions;

export default SiteSlice.reducer;
