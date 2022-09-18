import { RootState } from "../store";

export const selectFilter = (state: RootState) => state.filter;
export const selectSearchValue = (state: RootState) => state.filter.searchValue;
