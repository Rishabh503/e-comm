import { v2 as cloudinary } from 'cloudinary';
import { ApiError } from './ApiError.js'
import fs from "fs";

cloudinary.config({ 
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});


export const uploadOnCLoudinary= async (localfilepath)=>{

    if(!localfilepath) return new ApiError(401,"localfilepath not found ",error);


    try {
        const response = await cloudinary.uploader.upload( localfilepath,
                {resource_type:"auto"}
           ) 
               fs.unlinkSync(localfilepath)
           return response;
    } catch (error) {

        // yaha ake ek br unysnc krdena if sb works
         
         
        fs.unlinkSync(localfilepath)

        console.log("error in uploadOnCloudinary  error ::  ", error)
    }

}