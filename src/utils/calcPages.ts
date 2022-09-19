import { PizzaItem } from "../redux/pizza/types";

export const calcPages = (filtredItems: PizzaItem[], currentPage: number) => {
  const postsPerPage: number = 8;
  const lastPostIndex: number = currentPage * postsPerPage;
  const firstPostIndex: number = lastPostIndex - postsPerPage;
  let pages: number[] = [];
  for (let i = 1; i <= Math.ceil(filtredItems.length / postsPerPage); i++) {
    pages.push(i);
  }

  return { firstPostIndex, lastPostIndex, pages };
};
