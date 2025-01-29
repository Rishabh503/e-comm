import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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
        fullName:{
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
        avatarUrl:{
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

userSchema.methods.isPasswordCorrect= async function (password) {
    return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateAcessToken=function (){
    return jwt.sign({
            _id:this._id,
            email:this.email,
            username:this.username,
            fullName:this.fullName,
        },
    process.env.ACCESS_SECRET_KEY,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
)}

userSchema.methods.generateRefreshToken=function (){
    return jwt.sign(
        {
        _id:this._id
        },
            procces.env.REFRESH_SECRET_KEY
         ,
         {
            expiresIn:procces.env.REFRESH_TOKEN_EXPIRY
         }
    )
}

export const User=mongoose.model("User",userSchema)