//src/components/DishCard.tsx


import React from 'react'

// FIX 1: Change IDish to IMenuDish to match your type definition file
import { type IMenuDish } from '../types/menu' 

import { useCart } from '../hooks/useCart'
import { getCloudinaryUrl } from '../utils/imageUtils' 

// Assume style is available in the designated path
import '../components/styles/DishCard.css'

interface DishCardProps {
    // FIX 2: Use IMenuDish here
    dish: IMenuDish
}

const DishCard: React.FC<DishCardProps> = ({ dish }) => {
    // 🔑 MODIFICATION: Only use incrementVisualCount
    const { incrementVisualCount } = useCart();

    const handleAddToCart = () => {
        // 🔑 MODIFICATION: Call the visual increment function only
        incrementVisualCount(); 
        
        console.log(`Added ${dish.name} to cart. (VISUAL ONLY)`)
    }

    // Safely format the price: ensures 'price' is a finite number before calling toFixed(2)
    const formattedPrice =
        typeof dish.price === 'number' && isFinite(dish.price)
            ? dish.price.toFixed(2)
            : 'N/A' // Fallback for bad data

    // GENERATE THE FULL CLOUDINARY URL
    const imageUrl = getCloudinaryUrl(dish.imagePublicId) 

    return (
        <div className="dish-card">
            <div className="dish-info">
                
                <h3 className="dish-name">{dish.name}</h3>
                <p className="dish-price">₹ {formattedPrice}</p>
                <p className="dish-description">{dish.description}</p>
                <p className="dish-spice-level">Spice: {dish.spiceLevel}</p>
            </div>

            <div className="dish-actions">

                <img
                    src={imageUrl} 
                    alt={dish.name}
                    className="dish-image"
                />

                {/* The essential button to add the item to the global cart state (visually) */}
                <button
                    className="add-to-cart-btn"
                    onClick={handleAddToCart}
                >
                    ADD
                </button>

            </div>

        </div>
    )
}

export default DishCard