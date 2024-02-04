import { createSlice } from "@reduxjs/toolkit";
const reportSlice = createSlice({
  name: "report",
  initialState: {
    All: [],
    Approved: null,
    Rejected: null,
    Pending: null,
    ReportPage: [],
    status: "All",
  },
  reducers: {
    setAll(state, action) {
      state.All = action.payload;
    },
    setApproved(state, action) {
      state.Approved = action.payload;
    },
    setRejected(state, action) {
      state.Rejected = action.payload;
    },
    setPending(state, action) {
      state.Pending = action.payload;
    },
    setReportPage(state, action) {
      state.ReportPage = action.payload;
    },
    setReportPageStatus(state, action) {
      state.ReportPage.companyReportApprovalStatus = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
  },
});

export const {
  setAll,
  setApproved,
  setPending,
  setRejected,
  setReportPage,
  setReportPageStatus,
  setPendingStatus,
  setStatus,
} = reportSlice.actions;
export default reportSlice.reducer;
