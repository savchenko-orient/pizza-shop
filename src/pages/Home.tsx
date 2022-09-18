import React from "react";
import { useSelector } from "react-redux";

import {
  PizzaBlock,
  Categories,
  Sort,
  Pagination,
  Sceleton,
} from "../components";

import { useAppDispatch } from "../redux/store";
import { setCategory, setCurrentPage } from "../redux/filter/slice";
import { selectFilter } from "../redux/filter/selectors";
import { fetchPizzas } from "../redux/pizza/acyncActions";
import { selectPizza } from "../redux/pizza/selectors";

const Home: React.FC = () => {
  const categories: string[] = [
    "Всі",
    "М'ясні",
    "Вегетаріанські",
    "Гриль",
    "Гострі",
    "Закриті",
  ];

  const dispatch = useAppDispatch();

  const { category, sort, currentPage, searchValue } =
    useSelector(selectFilter);
  const { items, status } = useSelector(selectPizza);

  const onClickCategory = React.useCallback(
    (index: number) => {
      dispatch(setCategory(index));
    },
    [dispatch]
  );

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  // Если был первый рендерб то запрашиваем пиццы
  React.useEffect(() => {
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

    getPizzas();
  }, [category, sort.sortProperty, currentPage, dispatch]);

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
        <Sort value={sort} />
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
