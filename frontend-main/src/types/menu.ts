// src/types/menu.ts

export interface IMenuDish {
    _id: string; // The correct field for the unique ID (resolves the dish.id error)
    name: string;
    price: number;
    description: string;
    spiceLevel: string; 
    imagePublicId: string; // Field for Cloudinary asset ID
    category: string;
    restaurantId: string;
}

export interface ICartItem {
    item: IMenuDish;
    quantity: number;
}

// Added and correctly exported IMenuCategory (resolves the IMenuCategory export error)
export interface IMenuCategory {
    name: string;
    dishes: IMenuDish[]; // Categories contain an array of dishes
    // You can add an optional ID, description, etc., if needed:
    // _id?: string; 
    // description?: string;
}