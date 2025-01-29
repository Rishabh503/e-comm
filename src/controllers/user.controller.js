import { ApiError } from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js"
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCLoudinary } from "../utils/cloudinary.js";

export const registerUser=asyncHandler(async (req,res)=>{
 
    //get the data
    const {email,fullName,username,contact,address,password}=req.body
    console.log(req.body)
    
    if(!email || !fullName || !username || !contact ||  !address || !password){
        throw new ApiError(401,"all fields are mandatory")
    }

    //check the user 

    const existedUser = await User.findOne({
            $or:[{username},{email}]
        })

    if (existedUser){
        throw new ApiError(401,"user with this credentials already exists")
    }

    //check if we got the profilepic or not 
    //upload them on cloudinary
    //check uploadded or not
    //create user 
    //now find the user if it has been crreated or not 
    //return res
    console.log(req.file)
    const avatarLocalPath=await req.file?.path;

    if(!avatarLocalPath){
        return new ApiError(401,"didnt get the photo local path ");
    }

    const avatarUpload=await uploadOnCLoudinary(avatarLocalPath);

    if(!avatarUpload){
        throw new ApiError(401,"upload on cloudinary has failed")
    }

    const user=await User.create({
        username:username,
        email:email,
        fullName:fullName,
        contact:contact,
        address:address,
        avatarUrl:avatarLocalPath?.url || "",
        password:password
    })

    const createdUser=await User.findById(user._id).select("-password -refreshToken")

    if(!createdUser){
        throw new ApiError(401,"error while making the user ")
    }

    return res.status(201).json(
        new ApiResponse(200,createdUser,"user created susccsflyy")
    )

  
})