import { createSlice } from "@reduxjs/toolkit";

const reportSlice = createSlice({
  name: "toolkitCaseItem",
  initialState: {
    modalMessage: { type: null, status: null, text: null },
  },
  reducers: {
    addModalMessage(state, action) {
      state.modalMessage.type = action.payload.type;
      state.modalMessage.status = action.payload.status;
      state.modalMessage.text = action.payload.text;
    },
    clearModalMessage(state, action) {
      state.modalMessage.type = null;
      state.modalMessage.status = null;
      state.modalMessage.text = null;
    },
  },
});

export default reportSlice.reducer;
export const { addModalMessage, clearModalMessage } = reportSlice.actions;
