import { ApiError } from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js"
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCLoudinary } from "../utils/cloudinary.js";

const generateTokens=async (userId)=>{
    
        const user= await User.findById(userId);
        if (!user){
            throw new ApiError(201,"user not found in generating tokens")
        }

        const accessToken=user.generateAcessToken();
        const refreshToken=user.generateRefreshToken();

        user.refreshToken=refreshToken;
        await user.save({validateBeforeSave:false})

        return {accessToken,refreshToken}

    
}

export const registerUser=asyncHandler(async (req,res)=>{
 
    //get the data
    const {email,fullName,username,contact,address,password}=req.body

    
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
        avatarUrl:avatarUpload?.url || "",
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



//login func
    // make tokens
        //acess tokens
        //refresh tokens 
// get data 
//check if user exists or not
//compare given password 
//

export const login = asyncHandler(async (req,res)=>{
    const {email,password}=req.body
    console.log(req.body)

    if(!email || !password) throw new ApiError(401,"fill all fields")

    const user=await User.findOne({email});
    if(!user) throw new ApiError(400,"error while gettinf user here in login")
    
    const passwordValid=await user.isPasswordCorrect(password);

    if(!passwordValid) throw new ApiError(404,"password is wrong")

    const {accessToken,refreshToken}=await generateTokens(user._id);

    console.log(accessToken,refreshToken)

    const options={
        httpOnly:true
        ,secure:true
    }
    

    const loggedInUser=await User.findById(user._id).select("-password -refreshToken")

    return res.status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(new ApiResponse(200,{
        user:loggedInUser,
        accessToken:accessToken,
        refreshToken:refreshToken
    }))
    
})

export const loggoutUser=asyncHandler(async (req,res)=>{
    await User.findByIdAndUpdate(
        req.user._id,{
            $set:{
                refreshToken:undefined
            }
        },
        {
            new:true
        }
    )

    const options={
        httpOnly:true,
        secure:true
    }

    return res.status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(new ApiResponse(200,{},"User gaya ie logout"))
})