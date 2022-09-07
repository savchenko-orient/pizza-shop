import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    category: 0,
    sort: {
        name: 'популярністю',
        sortProperty: 'rating'
    },
    currentPage: 1,
};

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategory(state, action) {
            state.category = action.payload;
        },
        setSort(state, action) {
            state.sort = action.payload;
        },
        setCurrentPage(state, action) {
            state.currentPage = action.payload;
        },
        setFilters(state, action) {
            state.sort = action.payload.sort;
            state.currentPage = Number(action.payload.currentPage);
            state.category = Number(action.payload.category);
        }

    }
});

export const { setCategory, setSort, setCurrentPage, setFilters } = filterSlice.actions;

export default filterSlice.reducer;