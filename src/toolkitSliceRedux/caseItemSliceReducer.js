import { createSlice } from "@reduxjs/toolkit";

const caseItemSlice = createSlice({
  name: "toolkitCaseItem",
  initialState: {
    caseItem: {},
  },
  reducers: {
    addCaseItem(state, action) {
      state.caseItem = { ...action.payload };
    },
  },
});

export default caseItemSlice.reducer;
export const { addCaseItem } = caseItemSlice.actions;
