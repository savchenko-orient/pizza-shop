import React from 'react';
import './scss/app.scss';
import { Routes, Route } from "react-router-dom";

import Header from './components/Header.jsx';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';



function App() {
  const [cartItems, setCartItems] = React.useState([]);

  const onAddToCart = async (obj) => {
    setCartItems((prev) => [...prev, obj]);  /*prev - это предыдущие данные из переменной в useState. в данном случае из cartItems*/
  };


  return (
    <div className="wrapper">
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
    </div>

  );
}

export default App;
