import React from 'react'
import qs from 'qs';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import PizzaBlock from '../components/PizzaBlock';
import Categories from '../components/Categiries';
import Sort from '../components/Sort';
import Pagination from '../components/Pagination';

import { setCategory, setCurrentPage, setFilters, selectFilter } from '../redux/slices/filterSlice';
import { sortCategories } from './../components/Sort';
import { fetchPizzas, selectPizza } from '../redux/slices/pizzaSlice';
import Sceleton from '../components/PizzaBlock/Sceleton';

export default function Home() {
    const categories = ['Всі', "М'ясні", 'Вегетаріанські', 'Гриль', 'Гострі', 'Закриті',];

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isSearch = React.useRef(false);
    const isMounted = React.useRef(false);

    const { category, sort, currentPage, searchValue } = useSelector(selectFilter);
    const { items, status } = useSelector(selectPizza);

    const onClickCategory = (id) => {
        dispatch(setCategory(id));
    };
    const onChangePage = (number) => {
        dispatch(setCurrentPage(number))
    }
    const getPizzas = async () => {
        const sortBy = sort.sortProperty.replace('-', '');
        const order = sort.sortProperty.includes('-') ? 'desc' : 'asc';
        // asc(ASCending) - сортировка по возрастанию, desc(DESCending) - по убыванию
        const search = searchValue ? `&search=${searchValue}` : '';

        dispatch(
            fetchPizzas({
                sortBy,
                order,
                category,
                currentPage
            }));
        window.scrollTo(0, 0);
    };


    // Если изменили параметры и был первый рендер
    React.useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sort.sortProperty,
                category,
                currentPage
            });

            navigate(`?${queryString}`);
        }

        isMounted.current = true;
    }, [category, sort.sortProperty, currentPage])

    // Если был первый рендер, то проверяем URL-параметры и сохраняем в REDUX
    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));
            const sort = sortCategories.find((obj) => obj.sortProperty === params.sortProperty);

            dispatch(
                setFilters({
                    ...params,
                    sort
                })
            );
            isSearch.current = true;
        }
    }, [])

    // Если был первый рендерб то запрашиваем пиццы
    React.useEffect(() => {
        getPizzas();

    }, [category, sort, currentPage]);

    const filtredItems = items.filter(item =>
        item.title.toLowerCase().includes(searchValue.toLowerCase())
    );


    const pizzas = filtredItems.map((obj) => {
        return (
            <Link key={obj.id} to={`/pizza/${obj.id}`}>
                <PizzaBlock {...obj} />
            </Link>
        )
    });
    const skeletons = [...new Array(4)].map((_, index) => <Sceleton key={index} />);

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
            {status === 'error' ? (
                <div className="content__error-info">
                    <h1 >Сталася помилка😕</h1>
                    <p>Нажаль, нам не вдалося отримати піци. Спробуйте повторити пізніше.</p>
                </div>
            ) : (
                <div className="content__items">
                    {status === 'loading' ? skeletons : pizzas}
                </div>
            )}

            <Pagination currentPage={currentPage} onChangePage={onChangePage} />
        </div>
    )
}





{/* <Link
    to={`/pizza/${item.id}`}
    key={index}

>
    <PizzaBlock
        key={index}
        {...item}
    />
</Link> */}