// src/context/CartContext.tsx

import React, { createContext, useState } from 'react';
import type { ReactNode } from 'react'; 

// --- Type Definitions ---

// 🔑 MODIFIED: Only visual count functionality is exposed
export interface CartContextType {
  visualCartCount: number; 
  incrementVisualCount: () => void; 
  // REMOVED: cartItems, totalItems, clearCart, totalPrice, and all modification functions
}

export const CartContext = createContext<CartContextType | undefined>(undefined);


// Define the props for the provider component
interface CartProviderProps {
  children: ReactNode; 
}


// The provider component that manages state and provides it to children
export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  // 🔑 MODIFIED: Only visualCartCount state is maintained
  const [visualCartCount, setVisualCartCount] = useState(0);

  // --- Action Handlers ---
  
  const incrementVisualCount = () => {
    setVisualCartCount(prev => prev + 1);
    console.log('Visual Cart Badge Incremented');
  }

  // The value provided to consumers of the context
  const contextValue: CartContextType = {
    visualCartCount,
    incrementVisualCount,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};