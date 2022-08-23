import React from 'react'

export default function PizzaBlockSizes({ sizes }) {
    const [activeDiameter, setActiveDiameter] = React.useState(0);
    const onClickDiameter = (index) => {
        setActiveDiameter(index);
    }

    return (
        sizes.map((item, index) => {
            return (
                <li
                    key={index}
                    onClick={() => onClickDiameter(index)}
                    className={activeDiameter === index ? 'active' : ''}
                >
                    {item} см.
                </li>
            )
        })
    )
}
