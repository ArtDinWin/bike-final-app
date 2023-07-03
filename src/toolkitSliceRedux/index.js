import { combineReducers, configureStore } from "@reduxjs/toolkit";
import officersSliceReducer from "./officersSliceReducer";
import casesSliceReducer from "./casesSliceReducer";
import caseItemSliceReducer from "./caseItemSliceReducer";
import logSliceReducer from "./logSliceReducer";
import officerSliceReducer from "./officerSliceReducer";
import isAuthSlice from "./isAuthSliceReducer";

const rootReducer = combineReducers({
  officers: officersSliceReducer,
  cases: casesSliceReducer,
  caseItem: caseItemSliceReducer,
  officer: officerSliceReducer,
  isAuth: isAuthSlice,
  log: logSliceReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
