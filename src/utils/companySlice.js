import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "company",
  initialState: {
    companyData: [],
  },
  reducers: {
    setCompanyData: (state, action) => {
      state.companyData = action.payload;
    },
  },
});

export const { setCompanyData } = companySlice.actions;
export default companySlice.reducer;
