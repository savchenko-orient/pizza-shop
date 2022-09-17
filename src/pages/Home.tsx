import React from "react";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import PizzaBlock from "../components/PizzaBlock";
import Categories from "../components/Categiries";
import Sort from "../components/Sort";
import Pagination from "../components/Pagination";

import {
  setCategory,
  setCurrentPage,
  setFilters,
  selectFilter,
} from "../redux/slices/filterSlice";
import { sortCategories } from "../components/Sort";
import {
  fetchPizzas,
  selectPizza,
  SearchPizzaParams,
} from "../redux/slices/pizzaSlice";
import Sceleton from "../components/PizzaBlock/Sceleton";

import { useAppDispatch } from "../redux/store";

const Home: React.FC = () => {
  const categories: string[] = [
    "Всі",
    "М'ясні",
    "Вегетаріанські",
    "Гриль",
    "Гострі",
    "Закриті",
  ];

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isMounted = React.useRef(false);

  const { category, sort, currentPage, searchValue } =
    useSelector(selectFilter);
  const { items, status } = useSelector(selectPizza);

  const onClickCategory = (index: number) => {
    dispatch(setCategory(index));
  };
  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };
  const getPizzas = async () => {
    const sortBy = sort.sortProperty.replace("-", "");
    const order = sort.sortProperty.includes("-") ? "desc" : "asc";
    // asc(ASCending) - сортировка по возрастанию, desc(DESCending) - по убыванию
    // const search = searchValue ? `&search=${searchValue}` : "";

    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category: String(category),
        currentPage: String(currentPage),
      })
    );
    window.scrollTo(0, 0);
  };

  // Если изменили параметры и был первый рендер
  // React.useEffect(() => {
  //   if (isMounted.current) {
  //     const params = {
  //       category,
  //       sortProperty: sort.sortProperty,
  //       currentPage,
  //     };
  //     const queryString = qs.stringify(params, { skipNulls: true });

  //     navigate(`?${queryString}`);
  //   }
  // }, []);

  // Если был первый рендерб то запрашиваем пиццы
  React.useEffect(() => {
    getPizzas();
    isMounted.current = true;
  }, [category, sort.sortProperty, currentPage]);

  // // Если был первый рендер, то проверяем URL-параметры и сохраняем в REDUX
  // React.useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(
  //       window.location.search.substring(1)
  //     ) as unknown as SearchPizzaParams;
  //     const sortObj = sortCategories.find(
  //       (obj) => obj.sortProperty === params.sortBy
  //     );

  //     dispatch(
  //       setFilters({
  //         searchValue: searchValue,
  //         category: Number(params.category),
  //         sort: sortObj || sortCategories[0],
  //         currentPage: Number(params.currentPage),
  //       })
  //     );
  //   }
  // }, []);

  const filtredItems = items.filter((item: { title: string }) =>
    item.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  const pizzas = filtredItems.map((obj: any) => {
    return <PizzaBlock key={obj.id} {...obj} />;
  });
  const skeletons = [...new Array(4)].map((_, index) => (
    <Sceleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          categories={categories}
          value={category}
          onClickCategory={onClickCategory}
        />
        <Sort />
      </div>
      <h2 className="content__title">{categories[category]}</h2>
      {status === "error" ? (
        <div className="content__error-info">
          <h1>Сталася помилка😕</h1>
          <p>
            Нажаль, нам не вдалося отримати піци. Спробуйте повторити пізніше.
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletons : pizzas}
        </div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};
export default Home;
