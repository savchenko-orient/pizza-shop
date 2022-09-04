import React from 'react';

export default function Categories({ categories, value, onClickCategory }) {


    return (
        <div className="categories">
            <ul>
                {categories.map((item, i) => {
                    return (
                        <li
                            onClick={() => onClickCategory(i)}
                            className={value === i ? 'active' : ''}
                            key={i}
                        >
                            {item}
                        </li>
                    )
                })}

            </ul>
        </div>
    )
}
