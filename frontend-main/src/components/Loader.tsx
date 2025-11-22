// src/components/Loader.tsx
import React from 'react';
import './styles/Loader.css';

interface LoaderProps {
  type: 'card'; 
}

/**
 * Renders a Skeleton UI (placeholder) card.
 */
const Loader: React.FC<LoaderProps> = ({ type }) => {
  if (type === 'card') {
    return (
      <div className="skeleton-card">
        <div className="skeleton-image"></div>
        <div className="skeleton-content">
          <div className="skeleton-line full"></div>
          <div className="skeleton-line medium"></div>
          <div className="skeleton-line short"></div>
        </div>
      </div>
    );
  }
  return null;
};

export default Loader;