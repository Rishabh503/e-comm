import { Complaint } from "../models/complaint.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const newComplaint=asyncHandler(async(req,res)=>{
    const userId=req.params.userId;
    const user= await User.findById(userId)
    if(!user) throw new ApiError(404,"user not find or user data not being fetched")
    const {complaint,device,text}=req.body;

    if(!complaint|| !device) throw new ApiError(402,"data not recived from frontend")

    const newComplaint=await Complaint.create(
        {
            user:user,
            complaint:complaint,
            device:device,
            status:"pending",
            text:text||"",
        }
    )

    const createdComplaint=await Complaint.findById(newComplaint._id);

    if(!createdComplaint) throw new ApiError(402,"complaint couldnt be registered")
    
    user.complaints=user.complaints.push(createdComplaint);
    user.save({validateBeforeSave:false})
    return res.status(200).json(new ApiResponse(200,complaint,"Complaint created successfully"))
})

export const getAllComplaint=asyncHandler(async(req,res)=>{
    const allComplaints=await Complaint.find().populate("user").populate("visits").populate("followUps");
    if(!allComplaints) throw new ApiError(404,"complaints founding failed")
    return res.status(200).json(new ApiResponse(200,allComplaints,"here are all complainsts"))
})

export const getOneComplaint=asyncHandler(async(req,res)=>{
    const complaintId=req.params.complaintId;
    if(!complaintId) throw new ApiError(401,"didnt recieve the complaint id")

    const complain=await Complaint.findById(complaintId).populate("user");
    if(!complain) throw new ApiError(404,"error extracting the complaint or complaint doesnt exisist");

    return res.status(200).json(new ApiResponse(200,complain,"complain sent from backend"))
})