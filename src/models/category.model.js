import mongoose, { Schema } from "mongoose";

const categorySchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            unique:true,
        },
        description:{
            type:String,
            required:true
        },
        products:[{
            type:Schema.Types.ObjectId,
            ref:"Product"
        }]
}
,{timestamps:true})


export const Category=mongoose.model("Category",categorySchema)