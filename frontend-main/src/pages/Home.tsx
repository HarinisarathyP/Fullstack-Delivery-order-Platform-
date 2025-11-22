// src/pages/Home.tsx

import React, { useState, useMemo } from 'react';
// REMOVED: import Header from '../components/Header'; 
import SearchFilter from '../components/SearchFilter';
import RestaurantCard from '../components/RestaurantCard';
import Loader from '../components/Loader'; // <-- Restored
import { type FilterState, type CuisineFilter } from '../types'; // <-- Restored
import { useRestaurantData } from '../hooks/useRestaurantData'; // <-- Restored
import { useDebounce } from '../hooks/useDebounce'; // <-- Restored
import '../components/styles/SearchFilter.css'; 

// Define the full list of cuisine options available for the filters
const ALL_CUISINES: CuisineFilter[] = ['Indian', 'Italian', 'Chinese', 'American', 'Japanese', 'Mexican', 'South Indian'];

const Home: React.FC = () => {
  // 1. STATE MANAGEMENT: Holds all current user filters
  const [filterState, setFilterState] = useState<FilterState>({
    searchTerm: '',
    selectedCuisines: new Set<CuisineFilter>(),
    sortOption: 'relevance',
    minRating: null, // Start with no default minimum rating filter
  });

  // 2. APPLY DEBOUNCE: Delay updating the searchTerm to prevent excessive API calls
  const debouncedSearchTerm = useDebounce(filterState.searchTerm, 400);

  // 3. API FILTER STATE: Create a memoized object to pass to the API hook.
  const apiFilterState = useMemo(() => ({
    ...filterState,
    searchTerm: debouncedSearchTerm,
  }), [filterState, debouncedSearchTerm]);

  // 4. DATA FETCHING: Call the hook with the debounced filter state
  const { restaurants, loading, error, totalResults } = useRestaurantData(apiFilterState);

  // --- Handlers ---

  // Handler for text inputs, sort selection, and rating selection
  const handleFilterChange = (updates: Partial<FilterState>) => {
    setFilterState(prevState => ({ ...prevState, ...updates }));
  };

  // Handler for toggling cuisine selections (using Set for efficient state updates)
  const handleCuisineToggle = (cuisine: CuisineFilter) => {
    setFilterState(prevState => {
      const newCuisines = new Set(prevState.selectedCuisines);
      if (newCuisines.has(cuisine)) {
        newCuisines.delete(cuisine);
      } else {
        newCuisines.add(cuisine);
      }
      return { ...prevState, selectedCuisines: newCuisines };
    });
  };

  // --- Rendering ---

  return (
    <div className="home-page">
      {/* REMOVED: <Header /> is no longer rendered here as it is now in App.tsx */}
      <main className="main-content-area">
        <SearchFilter
          filterState={filterState}
          onFilterChange={handleFilterChange}
          onCuisineToggle={handleCuisineToggle}
          allCuisines={ALL_CUISINES}
        />

        <section className="listing-section">
          {/* Display results count or status */}
          <h2 className="results-count-title">
            {loading ? 'Fetching delicious food...' : `${totalResults} Restaurants Found`}
          </h2>

          {/* Error Message Display */}
          {error && <p className="error-message">Error: {error}. Could not load restaurants.</p>}

          {/* Conditional Rendering based on state */}
          {loading ? (
            <div className="restaurant-grid">
                {/* Show 6 skeleton loaders during data fetch */}
                {[...Array(6)].map((_, index) => <Loader key={index} type="card" />)}
            </div>
          ) : totalResults === 0 && !error ? (
            <p className="no-results-message">
              No restaurants match your current criteria. Try adjusting your filters!
            </p>
          ) : (
            <div className="restaurant-grid">
              {restaurants.map(restaurant => (
                <RestaurantCard key={restaurant._id} restaurant={restaurant} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Home;