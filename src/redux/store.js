import { configureStore } from '@reduxjs/toolkit'
import filter from './slices/filterSlice.js';
import search from './slices/searchSlice.js';

export const store = configureStore({
    reducer: {
        filter: filter,
        search: search
    },
})