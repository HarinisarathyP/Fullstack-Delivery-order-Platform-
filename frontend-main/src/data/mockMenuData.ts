// src/data/mockMenuData.ts

// FIX: Corrected type name from IDish to IMenuDish
import { type IMenuDish, type IMenuCategory } from '../types/menu'; 

// --- 1. Menu for Starbucks (ID: 691ec0f4d3f0f7f02369bc5c) ---
const R101_Dishes: IMenuDish[] = [
    {
        // FIX: Changed 'id' to '_id'
        _id: 'd001',
        restaurantId: '691ec0f4d3f0f7f02369bc5c',
        name: 'Caramel Macchiato',
        description: 'Espresso with vanilla syrup, steamed milk, and caramel drizzle.',
        price: 320.00,
        // FIX: Changed cloudinaryPublicId to imagePublicId and using direct ID
        imagePublicId: 'capachino_ytvnib',
        spiceLevel: 'none',
        // FIX: ADDED REQUIRED 'category' PROPERTY
        category: 'Espresso Beverages', 
    },
    {
        // FIX: Changed 'id' to '_id'
        _id: 'd003', // Reusing the Almond Croissant ID
        restaurantId: '691ec0f4d3f0f7f02369bc5c',
        name: 'Almond Croissant', 
        description: 'Flaky pastry with sweet almond filling.', 
        price: 210.00, 
        // FIX: Changed cloudinaryPublicId to imagePublicId and using direct ID
        imagePublicId: 'crossi_h22d64',
        spiceLevel: 'none',
        // FIX: ADDED REQUIRED 'category' PROPERTY
        category: 'Snacks & Bites', 
    },
];

// Grouping the 2 dishes into categories
export const R101_Menu: IMenuCategory[] = [
    // FIX: Using 'name' property instead of 'category'
    { name: 'Starbucks Favorites', dishes: R101_Dishes } 
];


// --- 2. Menu for KFC (ID: 691ec108d3f0f7f02369bc5d) ---
const R102_Dishes: IMenuDish[] = [
    // FIX: Changed 'id' to '_id'
    { 
        _id: 'd101', 
        restaurantId: '691ec108d3f0f7f02369bc5d', 
        name: 'Zinger Burger', 
        description: 'Crispy fillet, lettuce, and creamy sauce in a sesame bun.', 
        price: 199.00, 
        imagePublicId: 'zinger_xugfzm', 
        spiceLevel: 'medium',
        // FIX: ADDED REQUIRED 'category' PROPERTY
        category: 'Burgers',
    },
    { 
        // FIX: Changed 'id' to '_id'
        _id: 'd104', // Reusing the Hot Wings ID
        restaurantId: '691ec108d3f0f7f02369bc5d', 
        name: '3pc Hot Wings', 
        description: 'Spicy chicken wings coated in a fiery marinade.', 
        price: 180.00, 
        // FIX: Changed cloudinaryPublicId to imagePublicId and using direct ID
        imagePublicId: 'wings_z9jvh5',
        spiceLevel: 'hot',
        // FIX: ADDED REQUIRED 'category' PROPERTY
        category: 'Snacks & Sides',
    },
];

// Grouping the 2 dishes into categories
export const R102_Menu: IMenuCategory[] = [
    // FIX: Using 'name' property instead of 'category'
    { name: 'KFC Combos', dishes: R102_Dishes }
];


// --- 3. Menu for A2B (ID: 691ec119d3f0f7f02369bc5e) ---
const R103_Dishes: IMenuDish[] = [
    // FIX: Changed 'id' to '_id'
    { 
        _id: 'd201', 
        restaurantId: '691ec119d3f0f7f02369bc5e', 
        name: 'Ghee Roast Dosa', 
        description: 'Crispy rice crêpe roasted in clarified butter.', 
        price: 120.00, 
        imagePublicId: 'dosa_k419xs', 
        spiceLevel: 'mild',
        // FIX: ADDED REQUIRED 'category' PROPERTY
        category: 'Tiffin Items',
    },
    { 
        // FIX: Changed 'id' to '_id'
        _id: 'd203', // Reusing the Mysore Pak ID
        restaurantId: '691ec119d3f0f7f02369bc5e', 
        name: 'Mysore Pak', 
        description: 'Rich sweet delicacy made with chickpea flour and ghee.', 
        price: 80.00, 
        // FIX: Changed cloudinaryPublicId to imagePublicId and using direct ID
        imagePublicId: 'pak_owmbma',
        spiceLevel: 'none',
        // FIX: ADDED REQUIRED 'category' PROPERTY
        category: 'Sweets',
    },
];

// Grouping the 2 dishes into categories
export const R103_Menu: IMenuCategory[] = [
    // FIX: Using 'name' property instead of 'category'
    { name: 'South Indian Specials', dishes: R103_Dishes }
];


// --- FINAL EXPORT MAP ---
export const mockRestaurantMenus = {
    // FIX: Use the actual MongoDB IDs as keys to enable unique lookups
    '691ec0f4d3f0f7f02369bc5c': R101_Menu, // Starbucks (2 dishes)
    '691ec108d3f0f7f02369bc5d': R102_Menu, // KFC (2 dishes)
    '691ec119d3f0f7f02369bc5e': R103_Menu, // A2B (2 dishes)
};