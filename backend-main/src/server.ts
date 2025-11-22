// food-api/src/server.ts

import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db'; 
import restaurantRoutes from './routes/restaurantRoutes'; 
import path from 'path'; 

// --- NEW IMPORTS FOR UPLOAD ---
import { v2 as cloudinary } from 'cloudinary'; 
import multer from 'multer'; 
import fs from 'fs/promises'; 

// 🚨 TYPE FIX: Define a request interface that includes the 'file' property added by Multer
// This is necessary because Express's standard Request type doesn't know about Multer's additions.
interface MulterRequest extends Request {
    file: Express.Multer.File;
}

// Load environment variables explicitly from the project root
dotenv.config({ path: path.resolve(__dirname, '..', '.env') }); 

// ----------------------------------------------------
// ⚡️ CLOUDINARY CONFIGURATION ⚡️
// ----------------------------------------------------
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true, // Forces HTTPS URLs
});

// ----------------------------------------------------
// 💾 MULTER STORAGE SETUP 💾
// ----------------------------------------------------
// Define a temporary path relative to the server root (up one level from src)
const uploadPath = path.resolve(__dirname, '..', 'temp_uploads');

// Set up storage for Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Ensure the directory exists before saving
        fs.mkdir(uploadPath, { recursive: true }).then(() => {
            cb(null, uploadPath);
        }).catch(err => cb(err, uploadPath));
    },
    filename: (req, file, cb) => {
        // Create a unique file name using timestamp
        cb(null, Date.now() + '-' + file.originalname.replace(/\s/g, '_'));
    },
});

// Initialize Multer instance
const upload = multer({ storage: storage });

// Connect to the database immediately when the server starts
connectDB();

const app: Express = express();
const PORT = process.env.PORT || 5000;

// --- Middleware ---

// 1. CORS: Ensure all necessary methods are allowed for file upload
app.use(cors({
    // ✅ MERGE CONFLICT RESOLVED
    origin: 'https://frontend-pe93.onrender.com', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
}));

// ✅ FIX: Added the missing leading slash to the route path
app.get('/health',async(req:Request,res:Response)=>{
    res.send({message:"health ok"})
});

// 2. Body Parser: Handles JSON data (Note: Multer handles multipart/form-data for files)
app.use(express.json());

// ----------------------------------------------------
// 📸 CLOUDINARY UPLOAD ROUTE 📸
// ----------------------------------------------------

app.post('/api/upload-image', upload.single('image'), async (req: Request, res: Response) => {
    
    // 💡 FIX: Cast the request object to the custom MulterRequest type
    const multerReq = req as MulterRequest;
    
    if (!multerReq.file) {
        return res.status(400).json({ error: 'No image file provided.' });
    }
    
    const localFilePath = multerReq.file.path; 

    try {
        // Upload the file to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(localFilePath, {
            folder: 'food_app_images', // The folder name in Cloudinary
            resource_type: 'auto',
        });

        // 1. CLEANUP: Delete the temporary file from the server
        await fs.unlink(localFilePath); 

        // 2. RESPOND: Return the secure URL and public ID
        res.status(200).json({
            message: 'Image uploaded successfully!',
            url: uploadResult.secure_url,
            public_id: uploadResult.public_id,
        });

    } catch (error) {
        // Clean up file if the Cloudinary upload failed
        await fs.unlink(localFilePath).catch(e => console.error("Cleanup failed:", e)); 
        
        console.error('Cloudinary Upload Error:', error);
        res.status(500).json({ error: 'Failed to upload image.' });
    }
});

// 🧪 DIAGNOSTIC TEST ROUTE 🧪
// This checks if the /api prefix is successfully mounted before hitting the router.
app.get('/api/test-router', (req, res) => {
    res.status(200).send({ message: 'Diagnostic route success!' });
});

// --- Other Routes ---

// The main API endpoint. All requests to /api/restaurants will go to the router.
app.use('/api/restaurants', restaurantRoutes);

// --- Default Route ---
app.get('/', (req, res) => {
    res.send('Restaurant Listing API is Running...');
});

// --- Server Start ---
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Vite frontend is configured to proxy requests to this port.`);
});
