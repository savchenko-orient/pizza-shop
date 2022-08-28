import React from 'react';
import ContentLoader from "react-content-loader";
import PizzaBlockTypes from './PizzaBlockTypes';
import PizzaBlockSizes from './PizzaBlockSizes';


export default function PizzaBlock({ title, price, imageUrl, types, sizes, isLoading }) {
    return (
        <div className="pizza-block">
            {isLoading ? (
                <ContentLoader
                    speed={2}
                    width={280}
                    height={459}
                    viewBox="0 0 280 459"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                >
                    <circle cx="136" cy="123" r="119" />
                    <rect x="3" y="422" rx="11" ry="11" width="90" height="30" />
                    <rect x="5" y="322" rx="20" ry="20" width="265" height="75" />
                    <rect x="142" y="417" rx="20" ry="20" width="139" height="42" />
                    <rect x="46" y="271" rx="11" ry="11" width="181" height="35" />
                </ContentLoader>
            ) : (
                <>
                    <img
                        className="pizza-block__image"
                        src={imageUrl}
                        alt="Pizza"
                    />
                    <h4 className="pizza-block__title">{title}</h4>
                    <div className="pizza-block__selector">
                        <ul>
                            <PizzaBlockTypes
                                types={types}
                            />
                        </ul>
                        <ul>
                            <PizzaBlockSizes
                                sizes={sizes}
                            />
                        </ul>
                    </div>
                    <div className="pizza-block__bottom">
                        <div className="pizza-block__price">від {price} ₴</div>
                        <button className="button button--outline button--add">
                            <svg
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                                    fill="white"
                                />
                            </svg>
                            <span>Додати</span>
                            <i>1</i>
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}
