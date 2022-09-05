import React from 'react'
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import PizzaBlock from '../components/PizzaBlock';
import Categories from '../components/Categiries';
import Sort from '../components/Sort';
import Pagination from '../components/Pagination';

import { setCategory } from '../redux/slices/filterSlice';

export default function Home({ onAddToCart }) {
    const dispatch = useDispatch();
    const searchValue = useSelector((state) => state.search.searchValue);
    const { category, sortType } = useSelector((state) => state.filter);
    const onClickCategory = (id) => {
        dispatch(setCategory(id));
    };
    const [items, setItems] = React.useState([]);

    const categories = ['Всі', "М'ясні", 'Вегетаріанські', 'Гриль', 'Гострі', 'Закриті',];


    const [isLoading, setIsLoading] = React.useState(true);
    const [currentPage, setCurrentPage] = React.useState(1);

    const filtredItems = items.filter(item =>
        item.title.toLowerCase().includes(searchValue.toLowerCase())
    );

    React.useEffect(() => {
        const sortBy = sortType.sortProperty.replace('-', '');
        const order = sortType.sortProperty.includes('-') ? 'desc' : 'asc';
        // asc(ASCending) - сортировка по возрастанию, desc(DESCending) - по убыванию
        // const search = searchValue ? `&search=${searchValue}` : '';

        async function fetchData() {
            try {
                setIsLoading(true);
                const [itemsResponse] = await Promise.all([
                    axios.get(`https://630a2c2c324991003281df9d.mockapi.io/items?page=${currentPage}&limit=4&category=${category}&sortBy=${sortBy}&order=${order}`)
                ]);
                setItems(itemsResponse.data)
                console.log(itemsResponse.data)
                setIsLoading(false);
            } catch (error) {
                alert('Помилка під час запиту данних!');
                console.error('error: ', error);
            }
        }
        fetchData();
        window.scrollTo(0, 0);
    }, [category, sortType, currentPage]);


    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    categories={categories}
                    value={category}
                    onClickCategory={onClickCategory}
                />
                <Sort
                // isOpen={open}
                // onClickSortType={onClickSortType}
                // value={sortType}
                // onChangeSortType={onChangeSortType}
                />
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
            <Pagination onChangePage={(number) => setCurrentPage(number)} />
        </div>
    )
}





