import React from "react";

type CategoriesProps = {
  categories: string[];
  value: number;
  onClickCategory: (idx: number) => void;
};

const categories: string[] = [
  "Всі",
  "М'ясні",
  "Вегетаріанські",
  "Гриль",
  "Гострі",
  "Закриті",
];

const Categories: React.FC<CategoriesProps> = React.memo(
  ({ value, onClickCategory }) => {
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
  }
);

export default Categories;
