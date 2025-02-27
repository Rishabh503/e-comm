import mongoose, { Mongoose,Schema } from "mongoose";

const complaintSchema=mongoose.Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
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
    }]
},{timestamps:true})

export const Complaint=mongoose.model("Complaint",complaintSchema);