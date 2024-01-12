import { configureStore } from "@reduxjs/toolkit";
import reportSlice from "./reportSlice";
const store = configureStore({
  reducer: {
    report: reportSlice,
  },
});

export default store;
