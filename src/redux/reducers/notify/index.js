import { createSlice } from "@reduxjs/toolkit";
import { uuid } from "../../../utils";

export const initialState = {
  snackbars: [],
  snackbar: null,
};

const NotifySlice = createSlice({
  name: "Notify",
  initialState,
  reducers: {
    Push: (state, { payload }) => {
      payload = { ...payload, key: uuid() };
      state.snackbars.push(payload);
      state.snackbar = payload;
    },
    Close: (state, { payload }) => {
      let index = state.snackbars.findIndex((el) => el.key === payload);
      if (index !== -1) state.snackbars.splice(index, 1);

      if (state?.snackbar?.key === payload) state.snackbar = null;
    },
  },
});

export const { Close, Push } = NotifySlice.actions;

export default NotifySlice.reducer;
