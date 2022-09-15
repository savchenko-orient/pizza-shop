import React from "react";

type CategoriesProps = {
  categories: string[];
  value: number;
  onClickCategory: any;
};

const Categories: React.FC<CategoriesProps> = ({
  categories,
  value,
  onClickCategory,
}) => {
  return (
    <div className="categories">
      <ul>
        {categories.map((item, i) => {
          return (
            <li
              onClick={() => onClickCategory(i)}
              className={value === i ? "active" : ""}
              key={i}
            >
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Categories;
