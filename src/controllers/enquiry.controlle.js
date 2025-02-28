import { Enquiry } from "../models/enquiry.model.js"
import { FollowUp } from "../models/followUp.model.js"
import { User } from "../models/user.model.js"
import { Visit } from "../models/visit.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"


export const newEnquiry=asyncHandler(async(req,res)=>{
    const {name,contact,address,companyName,problem,requirements,status}=req.body

    if(!problem && !requirements) throw new ApiError (401,"give one of problem or requirements")

    const enquiry=await Enquiry.create({
        name,
        contact,
        address,
        companyName,
        problem,
        requirements,
        status
    })

    if(!enquiry) throw new ApiError(401,"failed creating  created enquirty")

    const createdEnquiry=await Enquiry.findById(enquiry._id);

    if(!createdEnquiry) throw new ApiError(401,"failed fetching the created enquirty")

    return res.status(200).json(new ApiResponse(200,enquiry,"enquiry ayi ha"))
})

export const getAllEnquiries = asyncHandler(async (req, res) => {
    try {
        const enquiries = await Enquiry.find().populate("followUps").populate("visits");

        if (!enquiries || enquiries.length === 0) {
            throw new ApiError(404, "No enquiries found");
        }

        return res.status(200).json(new ApiResponse(200, enquiries, "All enquiries fetched successfully"));
    } catch (error) {
        throw new ApiError(500, "Error fetching enquiries: " + error.message);
    }
})

export const newFollowUp=asyncHandler(async(req,res)=>{
    const enquiryId=req.params.enquiryId;
    const enquiry=await Enquiry.findById(enquiryId)
    if(!enquiry) throw new ApiError(401,"error finding the enquiry or enquiry doesnt exists")
    
    const {name,date,contact,text}=req.body;

    const followUp=await FollowUp.create(
        {name,
        date,
        contact,
        text,
        enquiryRef:enquiry._id
    }
    )

    if(!followUp) throw new ApiError("402","error creating follow up")
    
    enquiry.followUps=enquiry.followUps.push(followUp);
    enquiry.save({validateBeforeSave:false})

    return res.status(200).json(new ApiResponse(200,followUp,"follow up ban gaya"))

})

export const newVisit=asyncHandler(async(req,res)=>{
    const enquiryId=req.params.enquiryId;
    const {
        visitedBy,
        dateOfVisit,
        status,
        textArea}=req.body

        if(!visitedBy||!dateOfVisit||!status||! textArea) throw new ApiError(402,"all fields are required")

        // const user=await User.findOne({username:visitTo})
        // if(!user) throw new ApiError(401,"error finding user or user is not there")

        // const reminder=await new mongoose.Types.ObjectId(reminderReference);
        // if(!reminder) throw new ApiError(401,"error geeting reminder object id")

        const enquiry=await Enquiry.findById(enquiryId)
        if(!enquiry) throw new ApiError(401,"error geeting reminder data  ")

        
        const newVisit=await Visit.create({
        name:enquiry.companyName,
        dateOfVisit,
        visitedBy,
        problem :enquiry.problem,
        enquiryReference:enquiry._id,
        status,
        location:enquiry.address,
        textArea
        })

        const createdVisit=await Visit.findById(newVisit._id);
        if(!createdVisit) throw new ApiError(402,"error making visit ")

        console.log(createdVisit)

        enquiry.visits=enquiry.visits.push(createdVisit);
        await enquiry.save({validateBeforeSave:false});
        return res.status(200).json(new ApiResponse(200,createdVisit,"visit has been made "))

})

export const getEnquiry=asyncHandler(async(req,res)=>{
    const enquiryId=req.params.enquiryId;
    const enquiry=await Enquiry.findById(enquiryId).populate("followUps").populate("visits");

    if(!enquiry) throw new ApiError(401,"error geeting enquiry data  ")

    return res.status(200).json(new ApiResponse(200,enquiry,"aa gyi enquiry"))

})