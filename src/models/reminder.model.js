import mongoose, { Schema } from "mongoose";

const reminderSchema=new Schema({
        billNo:{
            type:Schema.Types.ObjectId,
            ref:"Bill",
            required:true
        },
        date:{
            type:Date,
            required:true
        },
        fullfilled:{
            type:Boolean,
            default:false
        },
        fullfilledBY:{
            type:String,
        },
        status:{
            type:String,
            required:true
        },
        visit:{
            type:Schema.Types.ObjectId,
            ref:"Visit"

        }
},{timestamps:true})

export const Reminder=mongoose.model("Reminder",reminderSchema)