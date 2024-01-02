import { createSlice } from '@reduxjs/toolkit';
const companySlice = createSlice({
    name: 'company',
    initialState: {
        toDeleteCompanies:null,
    },
    reducers: {
        setToDeleteCompanies(state, action) {
            state.toDeleteCompanies = action.payload;
        },
    }
});

export const { setToDeleteCompanies } = companySlice.actions;
export default companySlice.reducer;