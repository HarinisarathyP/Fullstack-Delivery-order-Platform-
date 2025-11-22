// src/api/index.ts
import { type Restaurant } from '../types/restaurant';
import { type FilterState } from '../types';
// 1. IMPORT IMenuDish (Assuming IMenuDish is in '../types/menu' or '../types')
import { type IMenuDish } from '../types/menu'; 

// Use environment variable for base URL, defaults to /api for Vite proxy
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

// --- Shared Utility Functions ---

/**
 * Constructs the URL query string from the current filter state.
 */
const buildQueryString = (filters: FilterState): string => {
    const params = new URLSearchParams();

    if (filters.searchTerm) {
        params.append('search', filters.searchTerm);
    }

    if (filters.selectedCuisines.size > 0) {
        // Send comma-separated list of selected cuisines
        params.append('cuisine', Array.from(filters.selectedCuisines).join(','));
    }

    params.append('sort', filters.sortOption);

    if (filters.minRating) {
        params.append('minRating', filters.minRating.toString());
    }

    return params.toString();
};

// --- Restaurant Fetching Logic ---

/**
 * Fetches restaurant data based on filters from the backend API.
 */
export async function fetchRestaurants(filters: FilterState): Promise<Restaurant[]> {
    const queryString = buildQueryString(filters);
    
    // 🎯 FIX: Hardcode '/api' into the URL construction
    const url = `${API_BASE_URL}/api/restaurants?${queryString}`;

    console.log('API Request URL:', url); 
    
    // REAL API FETCH LOGIC (Now the only code path)
    try {
        const response = await fetch(url);
        if (!response.ok) {
            // Handles HTTP errors like 404 or 500 returned by the backend
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: Restaurant[] = await response.json();
        return data;
    } catch (error) {
        // Handles network errors (e.g., if the backend server is not running)
        throw new Error('Failed to fetch data. Check your backend server is running on localhost:3000.');
    }
}

// 2. ADD MOCK MENU DATA AND FETCH FUNCTION (for API fallback/mocking)
const CLOUDINARY_DISH_PREFIX = 'foodiez/dish_'; 
const A2B_ID = '691ec119d3f0f7f02369bc5e'; // Example A2B ID

const MOCK_MENU_ITEMS: IMenuDish[] = [
    { 
        _id: 'd201', 
        name: 'Ghee Roast Dosa', 
        price: 120, 
        description: 'Crispy rice crêpe roasted in clarified butter.', 
        spiceLevel: 'mild', 
        // Corrected imagePublicId
        imagePublicId: `${CLOUDINARY_DISH_PREFIX}ghee_roast_dosa`, 
        category: 'Tiffin Items', 
        restaurantId: A2B_ID 
    },
    { 
        _id: 'd203', 
        name: 'Mysore Pak', 
        price: 80, 
        description: 'Rich sweet delicacy made with chickpea flour and ghee.', 
        spiceLevel: 'none', 
        // Corrected imagePublicId
        imagePublicId: `${CLOUDINARY_DISH_PREFIX}mysore_pak`, 
        category: 'Sweets', 
        restaurantId: A2B_ID 
    },
];

/**
 * Fetches the menu items for a specific restaurant ID from the backend API.
 */
export async function fetchMenuByRestaurantId(restaurantId: string): Promise<IMenuDish[]> {
    // 🎯 FIX: Hardcode '/api' into the URL construction
    const url = `${API_BASE_URL}/api/restaurants/${restaurantId}/menu`;

    console.log('API Request URL (Menu):', url);

    // REAL API FETCH LOGIC
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: IMenuDish[] = await response.json();
        return data;
    } catch (error) {
        // Fallback for development/mocking if the backend is down
        console.error('Failed to fetch menu from API, using mock data:', error);
        
        // Filter the mock data to only return items for the requested ID
        return MOCK_MENU_ITEMS.filter(item => item.restaurantId === restaurantId);
    }
}