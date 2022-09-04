import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    category: 0,
    sortType: {
        name: 'популярністю',
        sortProperty: 'rating'
    },
    open: false
};

const filterSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setCategory(state, action) {
            state.category = action.payload;
        },
        setSortType(state, action) {
            state.sortType = action.payload;
        },
        setIsOpen(state, action) {
            state.open = action.payload;
        }
    }
});

export const { setCategory, setSortType, setIsOpen } = filterSlice.actions;

export default filterSlice.reducer;