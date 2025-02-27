import {asyncHandler} from '../utils/asyncHandler.js'
import { User } from "../models/user.model.js";
import { Reminder } from "../models/reminder.model.js";
import { Visit } from "../models/visit.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from 'mongoose'
// import { asyncHandler } from "../utils/asyncHandler.js";
export const createVisit=asyncHandler(async(req,res)=>{
    const {visitTo,
        visitedBy,
        dateOfVisit,
        problem,
        reminderReference,
        status,
        location,
        textArea}=req.body

        if(!visitTo|| !visitedBy||!dateOfVisit||!problem||!reminderReference||!status||!location||! textArea) throw new ApiError(402,"all fields are required")

        const user=await User.findOne({username:visitTo})
        if(!user) throw new ApiError(401,"error finding user or user is not there")

        // const reminder=await new mongoose.Types.ObjectId(reminderReference);
        // if(!reminder) throw new ApiError(401,"error geeting reminder object id")

        const reminder=await Reminder.findById(reminderReference)
        if(!reminder) throw new ApiError(401,"error geeting reminder data  ")

        
        const newVisit=await Visit.create({
            visitTo:user,
        dateOfVisit,
        visitedBy,
        problem,
        reminderReference,
        status,
        location,
        textArea
        })

        const createdVisit=await Visit.findById(newVisit._id);
        if(!createdVisit) throw new ApiError(402,"error making visit ")

        console.log(createdVisit)

        reminder.visit=createdVisit;
        await reminder.save({validateBeforeSave:false});
        return res.status(200).json(new ApiResponse(200,createdVisit,"visit has been made "))

})

export const showVisit=asyncHandler(async (req,res)=>{
    const visitId=req.params.visitId;

    // console.log(billId);
    // console.log(mongoose.isValidObjectId(billId))

    const visitObjId=new mongoose.Types.ObjectId(visitId)

    if(!visitObjId) throw new ApiError(401,"couldnt receieve bill no ")
    // const bill=await Bill.findById(Number(billId));??
    const visit = await Visit.findOne({_id:visitObjId}).populate("visitTo").populate('reminderReference')
    if(!visit) throw new ApiError(401,"couldnt extract bill on the basis of bill id ")
    // console.log(bill);
    return res.status(200).json(new ApiResponse(200,visit,"bill got succesfully"))
    
})


// export const showBill=asyncHandler(async (req,res)=>{
//     const billId=req.params.billId;

//     // console.log(billId);
//     // console.log(mongoose.isValidObjectId(billId))

//     const billObjId=new mongoose.Types.ObjectId(billId)

//     if(!billId) throw new ApiError(401,"couldnt receieve bill no ")
//     // const bill=await Bill.findById(Number(billId));??
//     const bill = await Bill.findOne({_id:billObjId})
//     if(!bill) throw new ApiError(401,"couldnt extract bill on the basis of bill id ")
//     // console.log(bill);
//     return res.status(200).json(new ApiResponse(200,bill,"bill got succesfully"))
    
// })