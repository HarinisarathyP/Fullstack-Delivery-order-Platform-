import React, { useState } from 'react';
// FIX: Use explicit 'type' imports for FilterState, SortOption, and CuisineFilter
import { type FilterState, type SortOption, type CuisineFilter } from '../types'; 
import './styles/SearchFilter.css';

interface SearchFilterProps {
  filterState: FilterState;
  onFilterChange: (updates: Partial<FilterState>) => void;
  onCuisineToggle: (cuisine: CuisineFilter) => void;
  allCuisines: CuisineFilter[];
}

/**
 * Renders the search bar and all filtering/sorting controls.
 */
const SearchFilter: React.FC<SearchFilterProps> = ({
  filterState,
  onFilterChange,
  onCuisineToggle,
  allCuisines,
}) => {
  // Local state for instant feedback on the search input
  const [localSearchTerm, setLocalSearchTerm] = useState(filterState.searchTerm);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalSearchTerm(value);
    // updates the filterState, which is debounced in Home.tsx
    onFilterChange({ searchTerm: value }); 
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange({ sortOption: e.target.value as SortOption });
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const rating = parseFloat(e.target.value);
    // If rating is 0 or less (from 'Any'), set minRating to null
    onFilterChange({ minRating: rating > 0 ? rating : null });
  };

  const clearSearch = () => {
    setLocalSearchTerm('');
    onFilterChange({ searchTerm: '' });
  };

  return (
    <div className="search-filter-controls">
      {/* 1. Search Bar */}
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search for restaurants, cuisine, or a dish..."
          value={localSearchTerm}
          onChange={handleInputChange}
          className="search-input"
        />
        <span className="search-icon">🔍</span>
        {/* Clear button appears only when there is text */}
        {localSearchTerm && (
          <button className="clear-search-btn" onClick={clearSearch}>✕</button>
        )}
      </div>

      {/* 2. Filters Row */}
      <div className="filters-row">
        
        {/* Quick Filters (Static) */}
        <div className="quick-filters">
            <button className="filter-pill active">⚡ Fast Delivery</button>
            <button className="filter-pill">✨ Offers</button>
            <button className="filter-pill">🔥 Top Rated</button>
        </div>

        {/* Sort By Dropdown */}
        <div className="filter-group">
          <label htmlFor="sort-by">Sort By:</label>
          <select id="sort-by" value={filterState.sortOption} onChange={handleSortChange}>
            <option value="relevance">Relevance</option>
            <option value="deliveryTime">Delivery Time</option>
            <option value="rating">Rating (Highest)</option>
            <option value="costLowToHigh">Cost (Low to High)</option>
          </select>
        </div>
        
        {/* Rating Filter */}
        <div className="filter-group">
           <label htmlFor="min-rating">Min Rating:</label>
           <select id="min-rating" onChange={handleRatingChange} value={filterState.minRating ?? ''}>
            <option value="">Any</option>
            <option value="4.5">4.5+</option>
            <option value="4.0">4.0+</option>
            <option value="3.5">3.5+</option>
          </select>
        </div>
        
        {/* Cuisine Pills */}
        <div className="quick-filters cuisine-filters">
          {allCuisines.map(cuisine => (
            <button
              key={cuisine}
              className={`filter-pill ${filterState.selectedCuisines.has(cuisine) ? 'active' : ''}`}
              onClick={() => onCuisineToggle(cuisine)}
            >
              {cuisine}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;