import mongoose, { Schema } from "mongoose";

const userSchema=new mongoose.Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            trim:true,
            index:true,
            lowercase:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            trim:true,
            lowercase:true
        },
        fullname:{
            type:String,
            required:true,
            trim:true,
            index:true,
        },
        contact:{
            type:String,
            required:true,
        },
        address:{
            type:String,
            required:true,
        },
        profile:{
            type:String
        },
        orderHistory:[
            {
                type:Schema.Types.ObjectId,
                ref:"Order"
            }
        ],
        password:{
            type:String,
            required:true
        },
        refreshToken:{
            type:String
        }



},{timestamps:true}
)

export const User=mongoose.model("User",userSchema)