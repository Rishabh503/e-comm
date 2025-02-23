import { model } from "mongoose";
import { Product } from "../models/product.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCLoudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Category } from "../models/category.model.js";

export const addProduct=asyncHandler(async(req,res)=>{
    const {name,modelNo,price,description,categoryName}=req.body
    if(!name || !modelNo || !price || !description) throw new ApiError(401,"fill all fields")
    
    const existedProduct=await Product.findOne({modelNo})
    if(existedProduct) throw new ApiError(403,"product with this model no already found")
    
    const imageLocalPathOne=await req.files.photo1[0].path;
    if(!imageLocalPathOne) throw new ApiError(402,"image 1 not path found here")
    const uploadedImageOne=await uploadOnCLoudinary(imageLocalPathOne)
    if(!uploadedImageOne) throw new ApiError(402,"image one uploading issue found")
    

        const imageLocalPathTwo=await req.files.photo2[0].path;
      
        if(!imageLocalPathTwo) throw new ApiError(402,"image 2 not path found here")
        const uploadedImageTwo=await uploadOnCLoudinary(imageLocalPathTwo)
        if(!uploadedImageTwo) throw new ApiError(402,"image two uploading issue found")
        
    const images=[uploadedImageOne.url,uploadedImageTwo.url]
    console.log(categoryName)

    // console.log(Category.find().select("name"))
    const category=await Category.findOne({name:categoryName})
    console.log(category)
    if(!category) throw new ApiError(401,"category not found")

    
    const product =await Product.create(
        {
            name:name,
            modelNo:modelNo,
            price:price,
            description:description,
            image:images,
            category:category._id
        }
    )
    
    const createdProduct=await Product.findById(product._id)
    if(!createdProduct) throw new ApiError(401,"error while makinf product ")

    
    category.products.push(createdProduct._id)
    await category.save({validateBeforeSave:false})

    return res.status(200).json(new ApiResponse(200,product,"product creation done"))

})


// sbse pehle humne wo category in the url liya wo bhi as normal param by :categoryName
// then uske bd humne uske base pe wo category fetch ki 
// then uske bd humne category se sare products ki id leli 
// then uske bd humne sari ids se wo products ki info fetch krli 
// and har step pe sutiable errror laga diye the so that we know error generate kaha se hua and 
// alos humne har point pe cosnole log bhi kiya tha to get the info of this 
export const allProducts=asyncHandler(async(req,res)=>{

    const categoryName= req.params.categoryName;
    console.log(categoryName)
    if(!categoryName) throw new ApiError(401,"category not found")

    const cat=await Category.findOne({name:categoryName})
    if(!cat) throw new ApiError(401,"caat id nhi milri bhai ko ")
    
    // console.log(cat._id)
    // console.log(cat)
    // const allProducts=await Product.findById(catId._id)
    // if(!allProducts) throw new ApiError(400,"no category found or error in finding products")
        
    const allProductsID=cat.products;
    // console.log(allProducts)
    console.log("products info")
    const allProducts = await Promise.all(
        allProductsID.map((async (prod)=>{
            return await Product.findById(prod)
        })
    ))
    
    console.log(allProducts)

    return res.status(200).json(new ApiResponse(200,allProducts,"all product shave been fetched succesfully "))
})

