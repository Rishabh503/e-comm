import mongoose, { Mongoose,Schema } from "mongoose";

const complaintSchema=mongoose.Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    complaint:{
        type:String,
        required:true
    },
    device:{
        type:String,
        required:true
    },
    visits:[
        {
        type:Schema.Types.ObjectId,
        ref:"Visit"
        }
    ],
    status:{
        type:String,
    },
    followUps:[{
        type:Schema.Types.ObjectId,
        ref:"FollowUp"
    }],
    text:String
},{timestamps:true})

export const Complaint=mongoose.model("Complaint",complaintSchema);