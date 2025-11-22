// src/types/index.ts

// Defines the fixed options for sorting used in the dropdown and API query
export type SortOption = "relevance" | "deliveryTime" | "rating" | "costLowToHigh" | "costHighToLow";
export type CuisineFilter = string;

// The central state object defining all applied filters
export interface FilterState {
  searchTerm: string;
  selectedCuisines: Set<CuisineFilter>; // Use Set for efficient lookup of active cuisines
  sortOption: SortOption;
  minRating: number | null; // Null means no minimum rating filter is applied
}