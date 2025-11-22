// src/components/RestaurantCard.tsx



import React from 'react';

import { Link } from 'react-router-dom'; // Used for navigation

import type { Restaurant } from '../types/restaurant';

import './styles/RestaurantCard.css';

// 🔑 FIX: Corrected import path for useCart from '../context/CartContext.tsx' to '../hooks/useCart'





// ADDED: Cloudinary Base URL (This constant is necessary for image construction)

const CLOUDINARY_BASE_URL = "https://res.cloudinary.com/dx2tlnx96/image/upload/w_400/";



interface RestaurantCardProps {

    restaurant: Restaurant;

}



const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {



    




    // 🎯 FIX: Correct image source construction using the Cloudinary base URL

    // This assumes your Restaurant type has a nested 'image' object with a 'public_id'.

    // If your type has a different structure, update src/types/restaurant.ts accordingly.

    const imageSource = `${CLOUDINARY_BASE_URL}${restaurant.image.public_id}`;



    return (

        <article className="restaurant-card">

            {/* Promoted badge is outside the image wrapper */}

            {restaurant.isPromoted && <span className="promoted-badge">PROMOTED</span>}

            

            <div className="card-image-wrapper">

                <img 

                    src={imageSource} // Use the corrected imageSource

                    alt={restaurant.name} 

                    className="card-image" 

                    loading="lazy" 

                />

                {restaurant.offerText && <span className="offer-badge">{restaurant.offerText}</span>}

            </div>

            

            <div className="card-details">

                <div className="title-row">

                    <h3>{restaurant.name}</h3>

                    <span className={`rating-badge ${restaurant.rating >= 4.0 ? 'high-rating' : ''}`}>

                        {restaurant.rating.toFixed(1)} ⭐

                    </span>

                </div>

                

                <p className="cuisine-info">{restaurant.cuisine.join(', ')}</p>

                

                <div className="delivery-info-row">

                    <span className="time-text">🕒 {restaurant.deliveryTimeMinutes} mins</span>

                    

                    {typeof restaurant.distanceKm === 'number' && (

                        <span className="distance-text">| {restaurant.distanceKm.toFixed(1)} km</span>

                    )}

                    

                    <span className="cost-text">| ₹{restaurant.costForTwo} for two</span>

                </div>

                

                <div className="card-actions">

                    <Link to={`/restaurant/${restaurant._id}/menu`} className="view-menu-link">

                        <button className="view-menu-btn">View Menu</button>

                    </Link>

                    

                </div>

            </div>

        </article>

    );

};



export default RestaurantCard;