// src/hooks/useRestaurantData.ts (REVERTED TO API FETCH)

import { useState, useEffect } from 'react';
import { type Restaurant } from '../types/restaurant';
import { type FilterState } from '../types'; 
import { fetchRestaurants } from '../api'; // <-- RESTORED API IMPORT
// import { mockRestaurantList } from '../data/mockRestaurantList'; // <-- MOCK DATA IMPORT REMOVED

interface UseRestaurantDataResult {
  restaurants: Restaurant[];
  loading: boolean;
  error: string | null;
  totalResults: number;
}

/**
 * Custom hook to fetch restaurant data based on the current filter state.
 */
export const useRestaurantData = (filters: FilterState): UseRestaurantDataResult => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalResults, setTotalResults] = useState(0);

  // Convert the Set of cuisines to a stable string for useEffect dependency tracking
  const cuisineString = Array.from(filters.selectedCuisines).sort().join(',');

  useEffect(() => {
    setLoading(true);
    setError(null);
    setRestaurants([]);

    const loadData = async () => {
      try {
        // 🎯 FIX: CALL THE LIVE API
        const data = await fetchRestaurants(filters);
        setRestaurants(data);
        setTotalResults(data.length);
      } catch (err) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError("An unknown error occurred while loading data.");
        }
        setTotalResults(0);
      } finally {
        setLoading(false);
      }
    };

    loadData();

  }, [
    filters.searchTerm,
    cuisineString, 
    filters.sortOption,
    filters.minRating
  ]);

  return { restaurants, loading, error, totalResults };
};