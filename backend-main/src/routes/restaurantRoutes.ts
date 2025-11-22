import { Router, Request, Response } from 'express';
// Note: We'll import Restaurant model assuming it's exported correctly from ../models/Restaurant
import { Restaurant, IRestaurant } from '../models/Restaurant'; 
import { FilterQuery } from 'mongoose';

const router = Router();

// Define a common type for the query parameters expected from the frontend
interface RestaurantQuery extends Request {
    query: {
        search?: string;
        cuisine?: string; // Comma-separated string
        sort?: string;
        minRating?: string;
        lat?: string; // User Latitude
        lng?: string; // User Longitude
    };
}

// ----------------------------------------------------
// GET /api/restaurants - Fetch Filtered List
// ----------------------------------------------------
router.get('/', async (req: RestaurantQuery, res: Response) => {
  try {
    const { search, cuisine, sort, minRating, lat, lng } = req.query;

    const findQuery: FilterQuery<IRestaurant> = {};
    const sortQuery: any = {};
    
    // --- SEARCH FILTER ---
    if (search) {
      findQuery.$text = { $search: search as string };
      if (!sort || sort === 'relevance') {
          sortQuery.score = { $meta: 'textScore' };
      }
    }
    
    // --- CUISINE FILTER ---
    if (cuisine) {
      const cuisinesArray = (cuisine as string).split(',').map(c => c.trim());
      if (cuisinesArray.length > 0) {
        findQuery.cuisine = { $in: cuisinesArray };
      }
    }

    // --- RATING FILTER ---
    if (minRating) {
      const minRatingValue = parseFloat(minRating as string);
      if (!isNaN(minRatingValue)) {
        findQuery.rating = { $gte: minRatingValue };
      }
    }

    // --- GEOSPATIAL FILTER ---
    if (lat && lng) {
        const userLat = parseFloat(lat as string);
        const userLng = parseFloat(lng as string);
        const MAX_DISTANCE_METERS = 10000; 

        if (!isNaN(userLat) && !isNaN(userLng)) {
            findQuery.location = {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [userLng, userLat] // MongoDB expects [longitude, latitude]
                    },
                    $maxDistance: MAX_DISTANCE_METERS
                }
            };
            if (!sort || sort === 'relevance') {
                sortQuery['location.coordinates'] = 1;
            }
        }
    }
    
    // --- SORTING ---
    if (sort) {
        switch (sort) {
            case 'deliveryTime':
                sortQuery.deliveryTimeMinutes = 1; 
                break;
            case 'rating':
                sortQuery.rating = -1; 
                break;
            case 'costLowToHigh':
                sortQuery.costForTwo = 1; 
                break;
        }
    }

    const restaurants = await Restaurant.find(findQuery)
      .sort(sortQuery)
      .limit(50); 

    res.json(restaurants);

  } catch (error) {
    console.error('Error fetching restaurants:', error);
    res.status(500).json({ message: 'Internal Server Error during query.' });
  }
});


// ----------------------------------------------------
// POST /api/restaurants - Create New Item (Accepts Image Data)
// ----------------------------------------------------
router.post('/', async (req: Request, res: Response) => {
    try {
        const { 
            name, 
            cuisine, 
            costForTwo, 
            rating, 
            deliveryTimeMinutes,
            isPromoted,
            offerText,
            image // ⬅️ Image object containing {url, public_id} from frontend
        } = req.body;

        const newRestaurant = new Restaurant({
            name,
            cuisine, 
            costForTwo, 
            rating, 
            deliveryTimeMinutes,
            isPromoted,
            offerText,
            image: image, // Save the Cloudinary data directly
            
            // NOTE: Using placeholder coordinates for creation endpoint
            location: {
                type: 'Point',
                coordinates: [0, 0] 
            }
        });

        const savedRestaurant = await newRestaurant.save();

        res.status(201).json(savedRestaurant);

    } catch (error) {
        console.error('Error creating restaurant:', error);
        res.status(500).json({ message: 'Failed to create restaurant item.', error: (error as Error).message });
    }
});

export default router;