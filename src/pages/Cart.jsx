import React from 'react'
import CartBlock from '../components/CartBlock'

export default function Cart({ cartItems }) {
    return (
        <CartBlock
            cartItems={cartItems} />
    )
}
