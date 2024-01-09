import { createSlice } from "@reduxjs/toolkit";
const reportSlice = createSlice({
  name: "report",
  initialState: {
    All: null,
    Approved: null,
    Rejected: null,
    Pending: null,
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
  },
});

export const { setAll, setApproved, setPending, setRejected } =
  reportSlice.actions;
export default reportSlice.reducer;
