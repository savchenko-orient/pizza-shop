import React from 'react';
import axios from 'axios';
import './scss/app.scss';

import Header from './components/Header.jsx';
import Categories from './components/Categiries.jsx';
import Sort from './components/Sort.jsx';
import PizzaBlock from './components/PizzaBlock.jsx';



function App() {
  // function byField(field) {
  //   return (a, b) => a[field] > b[field] ? 1 : -1;
  // }
  // function fromBigToSmall(arr) {
  //   return arr.sort(byField('price'));
  // }

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const [itemsResponse] = await Promise.all([
          axios.get('https://630a2c2c324991003281df9d.mockapi.io/items')
        ]);
        setItems(itemsResponse.data);
        setIsLoading(false);
      } catch (error) {
        alert('Помилка під час запиту данних!');
        console.error('error: ', error);
      }
    }
    fetchData();
  }, []);




  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Всі піцци</h2>
          <div className="content__items">
            {/* {fromBigToSmall(pizzas).map((item, index) => {
              return (
                <PizzaBlock
                  key={index}
                  {...item}
                />
              )
            })} */}
            {(isLoading ? [...Array(12)] : items).map((item, index) => {
              return (
                <PizzaBlock
                  key={index}
                  isLoading={isLoading}
                  {...item}
                />
              )
            })}

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
