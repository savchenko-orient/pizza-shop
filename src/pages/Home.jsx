import React from 'react'
import axios from 'axios';

import PizzaBlock from '../components/PizzaBlock';
import Categories from '../components/Categiries';
import Sort from '../components/Sort';
import Pagination from '../components/Pagination';


export default function Home({ onAddToCart, searchValue }) {
    const categories = ['Всі', "М'ясні", 'Вегетаріанські', 'Гриль', 'Гострі', 'Закриті',];


    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [category, setCategory] = React.useState(0);
    const [open, setIsOpen] = React.useState(false);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [sortType, setSortType] = React.useState({
        name: 'популярністю', sortProperty: 'rating'
    });
    const onChangeSortType = (obj) => {
        setSortType(obj);
        setIsOpen(!open);
    }
    console.log(currentPage);


    React.useEffect(() => {
        const sortBy = sortType.sortProperty.replace('-', '');
        const order = sortType.sortProperty.includes('-') ? 'desc' : 'asc';
        // asc(ASCending) - сортировка по возрастанию, desc(DESCending) - по убыванию
        const search = searchValue ? `&search=${searchValue}` : '';

        async function fetchData() {
            try {
                setIsLoading(true);
                const [itemsResponse] = await Promise.all([
                    axios.get(`https://630a2c2c324991003281df9d.mockapi.io/items?page=${currentPage}&limit=4&category=${category}&sortBy=${sortBy}&order=${order}${search}`)
                ]);
                setItems(itemsResponse.data);
                setIsLoading(false);
            } catch (error) {
                alert('Помилка під час запиту данних!');
                console.error('error: ', error);
            }
        }
        fetchData();
        window.scrollTo(0, 0);
    }, [category, sortType, searchValue, currentPage]);




    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    categories={categories}
                    value={category}
                    onClickCategory={(i) => setCategory(i)}

                />
                <Sort
                    isOpen={open}
                    onClickSortType={setIsOpen}
                    value={sortType}
                    onChangeSortType={onChangeSortType}

                />
            </div>
            <h2 className="content__title">{categories[category]}</h2>
            <div className="content__items">
                {(isLoading ? [...Array(12)] : items).map((item, index) => {
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





