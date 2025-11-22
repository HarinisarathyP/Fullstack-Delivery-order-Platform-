// src/components/MenuCategory.tsx

import React from 'react';
// Assume style is available in the designated path
import './styles/MenuCategory.css';
interface MenuCategoryProps {
    categoryName: string;
    // The children will be the list of DishCard components
    children: React.ReactNode; 
}

const MenuCategory: React.FC<MenuCategoryProps> = ({ categoryName, children }) => {
    return (
        <section className="menu-category">
            {/* The main category heading */}
            <h2 className="category-title">{categoryName}</h2>
            
            {/* A separator line to visually group the items */}
            <hr className="category-separator" />
            
            {/* The children prop holds all the DishCard components rendered
                by the RestaurantMenu.tsx page for this specific category. */}
            <div className="category-dishes-wrapper">
                {children}
            </div>
        </section>
    );
};

export default MenuCategory;