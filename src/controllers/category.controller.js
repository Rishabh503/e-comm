import { Category } from "../models/category.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCLoudinary } from "../utils/cloudinary.js";

export const createCategory = asyncHandler(async (req,res)=>{
    
    const {name,description}=req.body
    if(name==="" || description ===""){
        throw new ApiError(401,"all fields are req")
    }
    console.log(req.body)
    const existedCategory=await Category.findOne({name} )
  
    // console.log(allCategroies)
    
    if(existedCategory) throw new ApiError(400,"category already found")
console.log(req.file)
    const posterLocalPath=await req.file?.path;
    console.log(posterLocalPath);
    if(!posterLocalPath) throw new ApiError(404,"error poster local path not found ie not coming from frontend")
    
    
    const posterUploadOnCloudinary=await uploadOnCLoudinary(posterLocalPath);
    if(!posterUploadOnCloudinary) throw new ApiError(402,"error uploading photo to the backend of cloudinary")
    // console.log(posterUploadOnCloudinary);
    const posterUrl=posterUploadOnCloudinary.url || ""
   const category = await Category.create(
    {
        name:name,
        description:description,
        posterUrl:posterUrl
    }
   )

   const createdCategory=Category.findById(category._id);

   if(!createCategory) throw new ApiError (401,"something went wrong in making category")

    return res.status(201).json(new ApiResponse(201,category,"created succesfully"))

})

export const getAllCategories=asyncHandler(async(req,res)=>{
    const allCategroies=await Category.find()
    return res.status(200).json(new ApiResponse(200,allCategroies,"these are categories"))
})

export const updateCategory=asyncHandler(async(req,res)=>{
    const categoryName=req.params.categoryName;
    console.log(categoryName)
    if(!categoryName) throw new ApiError(401,"category name not got")

    const category=await Category.findOne({name:categoryName})
    console.log(category)
    if(!category) throw new ApiError(401,"category with this name doesnt exit")


    const {newName,newDescription}=req.body
    category.name=newName;category.description=newDescription;
    await category.save({validateBeforeSave:false});

    return res.status(200).json(new ApiResponse(200,category,"category is updated"))
})

export const getCategory=asyncHandler(async(req,res)=>{
    const categoryName=req.query.categoryName
    if(!categoryName) throw new ApiError(401,"error in extracting category name from the url ")
    // const category=
    const category=await Category.findOne({name:categoryName})
    if(!category) throw new ApiError(401,"error in extracting category or category not found")

    return res.status(200).json(new ApiResponse(200,category,"under development"))
})