import { createSlice } from "@reduxjs/toolkit";

const isAuthSlice = createSlice({
  name: "toolkitIsAuth",
  initialState: {
    isAuth: false,
    isApproved: false,
    isLoading: true,
  },
  reducers: {
    isFalse(state, action) {
      state.isAuth = false;
      state.isApproved = false;
    },
    isTrue(state, action) {
      state.isAuth = true;
      state.isApproved = action.payload;
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
export const { isFalse, isTrue, isLoading, noLoading } = isAuthSlice.actions;
