import { configureStore } from '@reduxjs/toolkit'
import filter from './slices/filterSlice.js';
import search from './slices/searchSlice.js';
import cart from './slices/cartSlice.js';

export const store = configureStore({
    reducer: {
        filter,
        search,
        cart,
    },
})