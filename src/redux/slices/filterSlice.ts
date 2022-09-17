import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export enum SortPropertyEnum {
  RATING = "rating",
  PRICE_ASC = "price",
  PRICE_DESC = "-price",
  TITLE = "title",
}

export type Sort = {
  name: string;
  sortProperty: SortPropertyEnum;
};

export type FilterSliceState = {
  searchValue: string;
  category: number;
  sort: Sort;
  currentPage: number;
};

const initialState: FilterSliceState = {
  searchValue: "",
  category: 0,
  sort: {
    name: "популярністю",
    sortProperty: SortPropertyEnum.RATING,
  },
  currentPage: 1,
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setCategory(state, action: PayloadAction<number>) {
      state.category = action.payload;
    },
    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      if (Object.keys(action.payload).length) {
        state.sort = action.payload.sort;
        state.currentPage = Number(action.payload.currentPage);
        state.category = Number(action.payload.category);
      } else {
        state.currentPage = 1;
        state.category = 0;
        state.sort = {
          name: "популярністю",
          sortProperty: SortPropertyEnum.RATING,
        };
      }
    },
  },
});

export const selectFilter = (state: RootState) => state.filter;
export const selectSearchValue = (state: RootState) => state.filter.searchValue;

export const {
  setSearchValue,
  setCategory,
  setSort,
  setCurrentPage,
  setFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
