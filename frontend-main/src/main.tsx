import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
// Corrected import path: both files (main.tsx and styles.css) are in the 'src/' directory.
import './styles.css'; 
// ADD: Import the new provider
import { CartProvider } from './context/CartContext.tsx'; 

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* WRAP: Wrap the entire app with the CartProvider to make cart state available everywhere */}
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>,
);