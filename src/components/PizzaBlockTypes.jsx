import React from 'react'

export default function PizzaBlockTypes({ types }) {
    const [activeType, setActiveType] = React.useState(0);
    const onClickType = (index) => {
        setActiveType(index);
    }

    return (
        types.map((item, index) => {
            return (
                <li
                    key={index}
                    onClick={() => onClickType(index)}
                    className={activeType === index ? 'active' : ''}
                >
                    {item === 0 ? 'тонке' : 'традиційне'}
                </li>
            )
        })
    )
};
