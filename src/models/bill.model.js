import mongoose, { Schema } from "mongoose";

const billSchema=new mongoose.Schema({
        billTo:{
            type:Schema.Types.ObjectId,
            ref:"User"
        },
        amount:{
            type:Number,
            required:true
        },
        date:{
            type:Date,
            required:true
        },
        contact:{
            type:Number,
            required:true
        }, 
        email:{
            type:String,
            required:true,
            trim:true,
            lowercase:true,
        },
        category:{
            type:Schema.Types.ObjectId,
            ref:"Category",
        },
        status:{
            type:String,
            required:true,
        },
        reminder:[
            {
                type:Schema.Types.ObjectId,
                ref:"Reminder"
            }
        ],
        warranty:{
            type:Number,
            required:true
        },
        billUrl:String

},{timestamps:true})



export const Bill=mongoose.model("Bill",billSchema)