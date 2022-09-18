import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(
          `https://630a2c2c324991003281df9d.mockapi.io/items/${id}`
        );
        setPizza(data);
      } catch (error) {
        console.error(error, "Помилка під час запиту");
        navigate("/");
      }
    }
    fetchData();
  }, []);

  if (!pizza) {
    return <>"Загрузка"</>;
  }
  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="pizza" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} ₽</h4>
      <Link to="/">
        <button className="button button--outline button--back">
          <span>Назад</span>
        </button>
      </Link>
    </div>
  );
};

export default FullPizza;
