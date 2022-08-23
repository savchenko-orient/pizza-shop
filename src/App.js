import './scss/app.scss';

import Header from './components/Header.jsx';
import Categories from './components/Categiries.jsx';
import Sort from './components/Sort.jsx';
import PizzaBlock from './components/PizzaBlock.jsx';
import pizzas from './assets/pizzas.json';



function App() {
  const renderPizzas = pizzas.map((item, index) => {
    return (
      <PizzaBlock
        key={index}
        {...item}
      />
    )
  });


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
            {pizzas.map((item, index) => {
              return (
                <PizzaBlock
                  key={index}
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
