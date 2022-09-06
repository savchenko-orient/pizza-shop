import React from 'react'
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import PizzaBlock from '../components/PizzaBlock';
import Categories from '../components/Categiries';
import Sort from '../components/Sort';
import Pagination from '../components/Pagination';

import { setCategory, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { sortCategories } from './../components/Sort';

export default function Home({ onAddToCart }) {
    const categories = ['Всі', "М'ясні", 'Вегетаріанські', 'Гриль', 'Гострі', 'Закриті',];

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isSearch = React.useRef(false);
    const isMounted = React.useRef(false);
    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);

    const searchValue = useSelector((state) => state.search.searchValue);
    const { category, sort, currentPage } = useSelector((state) => state.filter);

    const onClickCategory = (id) => {
        dispatch(setCategory(id));
    };
    const onChangePage = (number) => {
        dispatch(setCurrentPage(number))
    }
    const fetchPizzas = () => {
        const sortBy = sort.sortProperty.replace('-', '');
        const order = sort.sortProperty.includes('-') ? 'desc' : 'asc';
        // asc(ASCending) - сортировка по возрастанию, desc(DESCending) - по убыванию
        // const search = searchValue ? `&search=${searchValue}` : '';

        async function fetchData() {
            try {
                setIsLoading(true);
                const [itemsResponse] = await Promise.all([
                    axios.get(`https://630a2c2c324991003281df9d.mockapi.io/items?page=${currentPage}&limit=4&category=${category}&sortBy=${sortBy}&order=${order}`)
                ]);
                setItems(itemsResponse.data)
                setIsLoading(false);
            } catch (error) {
                alert('Помилка під час запиту данних!');
                console.error('error: ', error);
            }
        }
        fetchData();
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
        window.scrollTo(0, 0);

        if (!isSearch.current) {
            fetchPizzas();
        }

        isSearch.current = false;
    }, [category, sort, currentPage]);

    const filtredItems = items.filter(item =>
        item.title.toLowerCase().includes(searchValue.toLowerCase())
    );

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
            <div className="content__items">
                {(isLoading ? [...Array(12)] : filtredItems).map((item, index) => {
                    return (
                        <PizzaBlock
                            key={index}
                            isLoading={isLoading}
                            onPlus={(obj) => onAddToCart(obj)}
                            {...item}
                        />
                    )
                })}
            </div>
            <Pagination currentPage={currentPage} onChangePage={onChangePage} />
        </div>
    )
}





