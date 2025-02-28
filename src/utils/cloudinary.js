import { v2 as cloudinary } from 'cloudinary'; 
import { ApiError } from './ApiError.js' 
import fs from "fs"; 
 
cloudinary.config({  
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,  
    api_key: process.env.CLOUDINARY_API_KEY,  
    api_secret: process.env.CLOUDINARY_API_SECRET 
}); 
 
export const uploadOnCLoudinary = async (localfilepath) => { 
    if (!localfilepath) return new ApiError(401, "localfilepath not found"); 
 
    try { 
        // Check if the file is a PDF by examining the extension
        const isPDF = localfilepath.toLowerCase().endsWith('.pdf');
        
        const uploadOptions = {
            resource_type: isPDF ? "raw" : "auto",
            // For PDFs, specifying format is sometimes helpful
            format: isPDF ? "pdf" : undefined
        };
        
        const response = await cloudinary.uploader.upload(
            localfilepath, 
            uploadOptions
        );
        
        fs.unlinkSync(localfilepath);
        return response; 
    } catch (error) { 
        fs.unlinkSync(localfilepath);
        console.log("error in uploadOnCloudinary error :: ", error);
        throw new ApiError(500, "Error uploading file to Cloudinary", error);
    } 
}