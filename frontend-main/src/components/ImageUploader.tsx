// src/components/ImageUploader.tsx
import React, { useState } from 'react';
import axios from 'axios';

// Use environment variable for base URL, defaults to /api for Vite proxy
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

interface ImageUploaderProps {
    // Passes the uploaded URL and Public ID back to the parent form
    onUploadSuccess: (url: string, publicId: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onUploadSuccess }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        setSelectedFile(file);
        setUploadError(null); 
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            setUploadError('Please select a file first.');
            return;
        }

        setUploading(true);
        setUploadError(null);

        const formData = new FormData();
        // 'image' MUST match upload.single('image') in your server.ts
        formData.append('image', selectedFile); 

        try {
            const response = await axios.post(`${API_BASE_URL}/upload-image`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', 
                },
            });

            onUploadSuccess(response.data.url, response.data.public_id);

            // Reset file input
            setSelectedFile(null);
            const fileInput = document.getElementById('fileInput') as HTMLInputElement;
            if (fileInput) fileInput.value = ''; 

        } catch (error) {
            console.error('Error during upload:', error);
            setUploadError('Upload failed. Check console for details.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div style={{ padding: '15px', border: '1px solid #e0e0e0', borderRadius: '5px' }}>
            <h4>Image Upload (Cloudinary)</h4>
            <input 
                type="file" 
                id="fileInput"
                accept="image/*" 
                onChange={handleFileChange} 
                disabled={uploading}
            />
            {selectedFile && <p style={{ fontSize: '0.9em', color: '#686b78' }}>Selected: {selectedFile.name}</p>}
            
            <button 
                onClick={handleUpload} 
                disabled={uploading || !selectedFile}
                style={{ marginTop: '10px', padding: '8px 15px', backgroundColor: 'var(--primary-color)', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
            >
                {uploading ? 'Uploading...' : 'Upload to Cloudinary'}
            </button>

            {uploadError && <p style={{ color: 'var(--primary-color)', marginTop: '10px' }}>{uploadError}</p>}
        </div>
    );
};

export default ImageUploader;