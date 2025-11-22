// food-api/src/models/Restaurant.ts
import { Schema, model, Document } from 'mongoose';

// Define the shape of the Cloudinary image object
interface Image {
  url: string;
  public_id: string;
}

// Interface for the Mongoose Document (inherits properties from Document)
export interface IRestaurant extends Document {
  name: string;
  // 🚨 CRITICAL FIX: Replaced imageUrl: string with the image object
  image?: Image; 
  cuisine: string[];
  rating: number;
  deliveryTimeMinutes: number;
  costForTwo: number;
  isPromoted: boolean;
  offerText: string | null;
  location: {
    type: string;
    coordinates: number[]; // [longitude, latitude]
  };
}

const RestaurantSchema: Schema = new Schema({
  name: { type: String, required: true },
  
  // 🚨 SCHEMA FIX: Define the nested structure for the image
  image: { 
    type: {
      url: { type: String, required: true },
      public_id: { type: String, required: true },
    },
    required: false, // Image is optional during creation but its sub-fields are mandatory if 'image' exists
  },
  
  // ⚠️ Removed: imageUrl: { type: String, required: true },
  
  cuisine: [{ type: String, required: true }],
  rating: { type: Number, required: true, min: 0, max: 5 },
  deliveryTimeMinutes: { type: Number, required: true },
  costForTwo: { type: Number, required: true },
  isPromoted: { type: Boolean, default: false },
  offerText: { type: String, default: null },
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    // Coordinates are stored as [longitude, latitude] for geospatial queries
    coordinates: { type: [Number], required: true }, 
  },
}, { timestamps: true });

// --- CRUCIAL PERFORMANCE INDEXES ---

// 1. Text Index: Enables the live search on name and cuisine fields.
RestaurantSchema.index({ name: 'text', cuisine: 'text' });

// 2. 2dsphere Index: Required for performing geospatial queries ($near, $maxDistance).
RestaurantSchema.index({ location: '2dsphere' });


export const Restaurant = model<IRestaurant>('Restaurant', RestaurantSchema);