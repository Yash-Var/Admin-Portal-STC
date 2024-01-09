import { configureStore } from "@reduxjs/toolkit";
import reportSlice from "./reportSlice";
import companySlice from "./companySlice";
const store = configureStore({
  reducer: {
    report: reportSlice,
    company: companySlice,
  },
});

export default store;
