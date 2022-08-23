import React from 'react';

export default function Categories() {
    const categories = ['Всі', "М'ясні", 'Вегетаріанські', 'Гриль', 'Гострі', 'Закриті "Кальцоне"',];



    const [activeIndex, setActiveIndex] = React.useState(0);
    const onClickCategory = (index) => {
        setActiveIndex(index);
    }

    return (
        <div className="categories">
            <ul>
                {categories.map((item, index) => {
                    return (
                        <li
                            onClick={() => onClickCategory(index)}
                            className={activeIndex === index ? 'active' : ''}
                            key={index}
                        >
                            {item}
                        </li>
                    )
                })}

            </ul>
        </div>
    )
}
