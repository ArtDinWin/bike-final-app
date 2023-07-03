import { createSlice } from "@reduxjs/toolkit";

const casesSlice = createSlice({
  name: "toolkitCases",
  initialState: {
    cases: [],
  },
  reducers: {
    addCases(state, action) {
      state.cases = action.payload;
    },
  },
});

export default casesSlice.reducer;
export const { addCases } = casesSlice.actions;
