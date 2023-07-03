import { createSlice } from "@reduxjs/toolkit";

const officerSlice = createSlice({
  name: "toolkitOfficer",
  initialState: {
    officer: {},
  },
  reducers: {
    addOfficer(state, action) {
      state.officer = { ...action.payload };
    },
  },
});

export default officerSlice.reducer;
export const { addOfficer } = officerSlice.actions;
