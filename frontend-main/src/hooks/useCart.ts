// src/hooks/useCart.ts

import { useContext } from 'react';
import { CartContext } from '../context/CartContext'; 
// MODIFIED: Import the type definition from the context file
import { type CartContextType } from '../context/CartContext'; 


// FIX: Correct the function return type to CartContextType
export const useCart = (): CartContextType => {
    // Cast the result of useContext to the expected type
    const context = useContext(CartContext); 

    // Safety check to ensure the hook is used inside the provider
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }

    // TypeScript now knows 'context' is of type CartContextType and can return it.
    return context;
};