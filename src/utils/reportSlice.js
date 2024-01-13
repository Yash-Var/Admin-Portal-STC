import { createSlice } from "@reduxjs/toolkit";
const reportSlice = createSlice({
  name: "report",
  initialState: {
    All: null,
    Approved: null,
    Rejected: null,
    Pending: null,
    ReportPage: [],
    PendingStatus: false,
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
    setPendingStatus(state, action) {
      state.PendingStatus = action.payload;
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
} = reportSlice.actions;
export default reportSlice.reducer;
