import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchValue: '',
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
        setSearchValue(state, action) {
            state.searchValue = action.payload;
        },
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

export const selectFilter = (state) => state.filter;
export const selectSearchValue = (state) => state.filter.searchValue;

export const { setSearchValue, setCategory, setSort, setCurrentPage, setFilters } = filterSlice.actions;

export default filterSlice.reducer;