// src/types/restaurant.ts (FINAL FIX)

export interface Image {
  // Assuming the Cloudinary Public ID is stored under this key
  public_id: string; 
  // Your backend might also return a full URL, but we will use the ID for construction
  url?: string; 
}

export interface Restaurant {
  _id: string; 
  name: string;
  // 🎯 FIX: Match the database field name 'image'
  image: Image; 
  cuisine: string[]; 
  rating: number; 
  deliveryTimeMinutes: number; 
  costForTwo: number; 
  isPromoted: boolean; 
  offerText: string | null; 
  distanceKm: number; 
  location: any; // Assuming 'location' object structure
}