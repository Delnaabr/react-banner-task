import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    signinVisible: true,
    signOutVisisble: false,
    adminLogged: false,
  },
  reducers: {
    signInShow(state) {
      state.signinVisible = !state.signinVisible;
    },
    signOutShow(state) {
      state.signOutVisisble = !state.signOutVisisble;
    },
    adminLog(state) {
      state.adminLogged = !state.adminLogged;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
