export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export type PizzaItem = {
  id: string;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
};

export type PizzaSliceState = {
  items: PizzaItem[];
  status: Status;
};

export type SearchPizzaParams = {
  sortBy: string;
  order: string;
  category: string;
  currentPage: string;
};
