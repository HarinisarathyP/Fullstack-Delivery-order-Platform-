// src/types/cart.ts (COMPLETE AND CORRECTED)



// 🔑 FIX 1: Corrected import name from 'IDish' to the actual exported type 'IMenuDish'

import { type IMenuDish } from './menu';



// Defines the structure of an item saved in the shopping cart

export interface ICartItem {

    dishId: string;

    restaurantId: string;

    name: string;

    price: number;

    quantity: number;

}



// Defines the overall structure of the cart state

export interface ICartState {

    items: ICartItem[];

    // Note: This should ideally be the total count of all items (sum of quantities)

    totalItems: number; 

    totalAmount: number; // Sum of all item prices * quantities

}



// Defines the structure of the Context Provider's value (the functions and state exposed)

export interface ICartContext {

    cart: ICartState;

    // 🔑 FIX 2 & 3: Renamed to standard 'addToCart' and using correct 'IMenuDish' type

    addToCart: (dish: IMenuDish) => void; 

    // Function to remove an item completely

    removeFromCart: (dishId: string) => void;

    // Function to update item quantity

    updateQuantity: (dishId: string, quantity: number) => void;

    // Function to empty the entire cart

    clearCart: () => void; 

}