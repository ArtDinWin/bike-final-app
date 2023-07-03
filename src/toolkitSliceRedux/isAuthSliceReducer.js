import { createSlice } from "@reduxjs/toolkit";

const isAuthSlice = createSlice({
  name: "toolkitIsAuth",
  initialState: {
    isAuth: false,
    isLoading: true,
  },
  reducers: {
    isFalse(state, action) {
      state.isAuth = false;
    },
    isTrue(state, action) {
      state.isAuth = true;
    },
    isToggle(state, action) {
      state.isAuth = !state.isAuth;
    },
    isLoading(state, action) {
      state.isLoading = true;
    },
    noLoading(state, action) {
      state.isLoading = false;
    },
  },
});

export default isAuthSlice.reducer;
export const { isFalse, isTrue, isToggle, isLoading, noLoading } =
  isAuthSlice.actions;
