import { configureStore } from "@reduxjs/toolkit";
import companySlice from "./companySlice";
const store = configureStore({
    reducer:{
        company: companySlice,
    }
});

export default store;