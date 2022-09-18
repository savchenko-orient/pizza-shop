import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SearchPizzaParams, PizzaItem } from "./types";

export const fetchPizzas = createAsyncThunk<PizzaItem[], SearchPizzaParams>(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { sortBy, order, category, currentPage } = params;
    const { data } = await axios.get<PizzaItem[]>(
      `https://630a2c2c324991003281df9d.mockapi.io/items?page=${currentPage}&limit=4&category=${category}&sortBy=${sortBy}&order=${order}`
    );

    return data;
  }
);
