// src/components/MiniCart.tsx

import React from 'react';
import { useCart } from '../hooks/useCart';
import { useNavigate } from 'react-router-dom';

// Assume style is available in the designated path

const MiniCart: React.FC = () => {
    // 🔑 MODIFICATION: Use visualCartCount for the badge
    const { visualCartCount } = useCart(); 
    const navigate = useNavigate();

    // The cart icon will navigate to the full cart page
    const handleCartClick = () => {
        navigate('/cart');
    };

    return (
        <div className="mini-cart-container" onClick={handleCartClick}>
            {/* You would use an actual icon library here (e.g., Font Awesome or Lucide)
            but we'll use a simple shopping bag emoji/text placeholder for now. */}
            <span className="cart-icon">🛒</span>
            
            {/* The Badge: Only show if there are items in the cart */}
            {/* 🔑 MODIFICATION: Use visualCartCount for the badge display */}
            {visualCartCount > 0 && (
                <span className="cart-badge">
                    {/* Displays the total count of items (sum of quantities) */}
                    {visualCartCount}
                </span>
            )}
        </div>
    );
};

export default MiniCart;