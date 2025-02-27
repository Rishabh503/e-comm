import mongoose, { Mongoose, Schema } from 'mongoose'

const visitSchema=new mongoose.Schema(
    {
        visitTo:{
           type:Schema.Types.ObjectId,
            ref:"User"
        },
        name:{
            type:String
        },
        visitedBy:{
            type:String,
            required:true
        },
        dateOfVisit:{
            type:Date,
            required:true
        },
        problem:{
            type:String
        },
        reminderReference:{
            type:Schema.Types.ObjectId,
            ref:"Reminder"
        },
        complaintReference:{
            type:Schema.Types.ObjectId,
            ref:"Complaint"
        },
        enquiryReference:{
             type:Schema.Types.ObjectId,
            ref:"Enquiry"
        },
        status:{
            type:String,
            required:true
        },
        location:{
            type:String,
            required:true
        },
        textArea:{
            type:String,
           
        },
        fileUrl:{
            type:String
        }
    }
    ,{timestamps:true}
)

export const Visit=mongoose.model("Visit",visitSchema);