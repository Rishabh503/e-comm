import mongoose, { Schema } from "mongoose";

const productSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        modelNo:{
            type:String,
            required:true,
            unique:true
        },
        price:{
            type:Number,
            required:true,
        },
        description:{
            type:String,
        },
        stock:{
            type:Number,
            required:true,
        },
        category:{
            type:Schema.Types.ObjectId,
            ref:"Category"
        },
        image:[
            {
            type:String,
            required:true
            }
        ],
}
,{timestamps:true})

export const Product=mongoose.model("Product",productSchema)