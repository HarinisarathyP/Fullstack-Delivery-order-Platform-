// src/App.tsx (CORRECT)

import React from 'react';
// Import Routing components
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Import the Context Provider
import { CartProvider } from './context/CartContext.tsx'; 

import Home from './pages/Home';
import Header from './components/Header';
// Import the new page components
import RestaurantMenu from './pages/RestaurantMenu'; 
import Cart from './pages/Cart'; 

const App: React.FC = () => {
  return (
    // Application is wrapped in CartProvider to enable cart functionality
    <CartProvider>
      <Router>
        <div className="app-container">
          {/* Header remains outside the Routes so it's always visible */}
          <Header /> 

          <main className="main-content">
            <Routes>
              {/* Existing Home Route */}
              <Route path="/" element={<Home />} />
              
              {/* Dynamic Menu Page Route */}
              <Route 
                path="/restaurant/:restaurantId/menu" 
                element={<RestaurantMenu />} 
              />
              
              {/* Cart Review Page Route */}
              <Route path="/cart" element={<Cart />} />
              
              {/* Not Found Route */}
              <Route path="*" element={<h1>404: Page Not Found</h1>} />
            </Routes>
          </main>
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;