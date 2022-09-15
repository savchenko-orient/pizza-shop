import React from "react";
import { Link } from "react-router-dom";
import emptyCart from "../assets/img/empty-cart.png";

const CartEmpty: React.FC = () => {
  return (
    <>
      <div className="cart cart--empty">
        <h2>
          Кошик пустий <span className="icon">😕</span>
        </h2>
        <p>
          Ви ще не замовляли піцу
          <br />
          Для замовлення піци перейдіть на головну сторінку.
        </p>
        <img src={emptyCart} alt="Empty cart" />
        <Link to="/" className="button button--black">
          <span>Повернутись назад</span>
        </Link>
      </div>
    </>
  );
};
export default CartEmpty;
