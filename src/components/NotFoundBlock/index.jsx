import React from 'react'
import styles from './NotFoundBlock.module.scss';

export default function NotFoundBlock() {
    return (
        <div>
            <h1 className={styles.root}>
                <span>😕</span>
                <br />
                Нічого не знайдено
            </h1>
            <p className={styles.description}>Нажаль дана сторінка відсутня в нашому інтернет магазині</p>
        </div>
    )
}
