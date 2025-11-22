// src/pages/RestaurantMenu.tsx (FINAL CORRECTED LOGIC)

import React from 'react';
import { useParams } from 'react-router-dom';
import DishCard from '../components/DishCard';
import MenuCategory from '../components/MenuCategory';
import { mockRestaurantMenus } from '../data/mockMenuData';
import { type IMenuCategory } from '../types/menu';
import '../components/styles/RestaurantMenu.css'; 
// import { getCloudinaryUrl } from '../utils/imageUtils'; // <-- NOTE: Not needed here, but required in DishCard.

const RestaurantMenu: React.FC = () => {
    // 1. Get the restaurant ID from the URL parameter (e.g., '691ec0f4d3f0f7f02369bc5c')
    const { restaurantId } = useParams<{ restaurantId: string }>();

    // 🎯 FIX: Perform a direct lookup using the unique restaurantId from the URL.
    // This connects the URL to the unique key you defined in mockMenuData.ts.
    const menu: IMenuCategory[] | undefined = restaurantId 
        ? mockRestaurantMenus[restaurantId as keyof typeof mockRestaurantMenus]
        : undefined;

    // We use a lookup table to correctly display the restaurant name
    const getRestaurantName = (id: string | undefined): string => {
        if (!id) return 'Restaurant Not Found';
        
        switch(id) {
            case '691ec0f4d3f0f7f02369bc5c': return 'Starbucks';
            case '691ec108d3f0f7f02369bc5d': return 'KFC';
            case '691ec119d3f0f7f02369bc5e': return 'A2B';
            default: return 'Restaurant Not Found';
        }
    };
    
    const restaurantName = getRestaurantName(restaurantId);

    if (!restaurantId || !menu) {
        return (
            <div className="restaurant-menu-page">
                <div className="error-message">
                    <h2>{restaurantName}</h2>
                    <p>Sorry, the menu for this restaurant is not available.</p>
                </div>
            </div>
        );
    }

    // --- Main Render ---

    return (
        <div className="restaurant-menu-page">
            <header className="menu-header">
                <h1>{restaurantName}</h1>
                <p>Koramangala, Bangalore</p>
                <hr /> 
            </header>

            <div className="menu-content">
                {/* Loop through categories and dishes */}
                {menu.map((menuCategory, index) => (
                    <MenuCategory 
                        key={index} 
                        // FIX: Use menuCategory.name instead of menuCategory.category
                        categoryName={menuCategory.name}
                    >
                        <div className="dish-list">
                            {menuCategory.dishes.map(dish => (
                                <DishCard 
                                    // FIX: Use dish._id instead of dish.id
                                    key={dish._id} 
                                    dish={dish} 
                                    // NOTE: DishCard is where the image URL is generated and used.
                                />
                            ))}
                        </div>
                    </MenuCategory>
                ))}
            </div>
        </div>
    );
};

export default RestaurantMenu;