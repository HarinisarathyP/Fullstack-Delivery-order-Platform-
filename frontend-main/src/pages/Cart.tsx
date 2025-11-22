// src/pages/Cart.tsx

import React from 'react';
import { useCart } from '../hooks/useCart';
// REMOVED: import of ICartItem as it is no longer needed
import '../components/styles/cart.css';

const Cart: React.FC = () => {
    // 🔑 MODIFIED: No cart state is destructured, as the page is now static/empty.
    const { } = useCart(); 
    
    // --- Render Logic ---
    // Since there are no cart items in state, the cart is always considered empty.
    return (
        <div className="cart-page empty-cart">
            <h1>Your Cart is Empty</h1>
            <p>Looks like you haven't added anything to your cart yet. Time to browse some delicious food!</p>
        </div>
    );
};

export default Cart;