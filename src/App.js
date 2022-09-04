import React from 'react';
import { Routes, Route } from "react-router-dom";

import './scss/app.scss';
import Header from './components/Header.jsx';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';


export const SearchContext = React.createContext();

function App() {

  const [cartItems, setCartItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const onAddToCart = async (obj) => {
    setCartItems((prev) => [...prev, obj]);  /*prev - это предыдущие данные из переменной в useState. в данном случае из cartItems*/
  };


  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }} >
        <Header />
        <div className="content">

          <Routes>
            <Route
              exact path="/"
              element={
                <Home

                  onAddToCart={onAddToCart}
                />
              }
            />
            <Route
              path="*"
              element={
                <NotFound />
              } />
            <Route
              path="/cart"
              element={
                <Cart
                  cartItems={cartItems}
                />}
            />
          </Routes>
        </div>
      </SearchContext.Provider>



    </div>
  );
}

export default App;
