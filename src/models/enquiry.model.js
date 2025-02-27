import mongoose, { Mongoose } from "mongoose";
const enquirySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    contact:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    companyName:{
        type:String,
        required:true,
    },
    problem:{
        type:String
    },
    requirements:{
        type:String
    },
    quotations:[{
        price:{
            type:Number,
            required:true
        },
        fileUrl:{
            type:String,
            required:true
        },
        date:{
            type:Date
        }
    }],
    status:{
        type:String,
        required:true,
    },
    visits: [{ type: mongoose.Schema.Types.ObjectId, ref: "Visit" }],
    followUps: [{ type: mongoose.Schema.Types.ObjectId, ref: "FollowUp" }],


},{timestamps:true})

export const Enquiry=mongoose.model("Enquiry",enquirySchema)