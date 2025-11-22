// src/components/Header.tsx

import React from 'react';
import { useCart } from '../hooks/useCart'; 
import './styles/Header.css';

/**
 * Renders the persistent header/navigation bar.
 */
const Header: React.FC = () => {
    // 🔑 MODIFICATION: Use visualCartCount for the badge
    const { visualCartCount } = useCart();
    
    return (
        <header className="app-header">
            
            {/* 1. LEFTMOST: Logo (Will be rendered sideways by CSS) */}
            <div className="logo-container">
                <h1 className="logo">QuickGrab</h1>
            </div>
            
            {/* 2. MIDDLE: Location */}
            <div className="location-container">
                <span className="location-icon">📍</span>
                <span className="location-text">Koramangala, Bangalore</span>
            </div>
            
            {/* 3. RIGHTMOST: Cart and Profile Icons */}
            <div className="user-actions">
                <button className="icon-btn cart-btn" aria-label="Shopping Cart">
                    🛒
                    {/* 🔑 MODIFICATION: Use visualCartCount for the badge display */}
                    {visualCartCount > 0 && <span className="cart-badge">{visualCartCount}</span>}
                </button>
                <button className="icon-btn" aria-label="User Profile">👤</button>
            </div>

        </header>
    );
};

export default Header;