import { createSlice } from "@reduxjs/toolkit";

const officersSlice = createSlice({
  name: "toolkitOfficers",
  initialState: {
    officers: [],
  },
  reducers: {
    addOfficers(state, action) {
      state.officers = action.payload;
    },
  },
});

export default officersSlice.reducer;
export const { addOfficers } = officersSlice.actions;
