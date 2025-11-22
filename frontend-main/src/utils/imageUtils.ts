// src/utils/imageUtils.ts

// FIX: Using the cloud name directly as requested.


// FIX: Corrected the template literal to embed the variable CLOUDINARY_CLOUD_NAME
// The variable name should be inside the ${...} without extra quotes.
const CLOUDINARY_BASE_URL = 'https://res.cloudinary.com/dx2tlnx96/image/upload/';

/**
 * Constructs the full Cloudinary URL for a given public ID, including image optimization.
 * @param publicId The unique identifier of the image (e.g., 'menu_assets/caramel_macchiato').
 * @returns A full, optimized HTTPS URL.
 */
export const getCloudinaryUrl = (publicId: string): string => {
    if (!publicId) {
        // Fallback placeholder image if no publicId is provided
        return 'https://via.placeholder.com/100x100?text=No+Image';
    }
    // Optimization: Add a standard transformation (width 100, height 100, crop fill)
    const transformation = 'w_100,h_100,c_fill/';
    return `${CLOUDINARY_BASE_URL}${transformation}${publicId}`;
};