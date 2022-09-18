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
