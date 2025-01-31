import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";



export const app=express();

// isme 2 -3 steps krne h

// config cors cookieparser and 2-3 express middlewares 

// cors
app.use(cors({
    origin:process.env.CORS,
    credentials:true
}))


//express ke 
app.use(express.json())

app.use(express.urlencoded({extended:true}))

app.use(express.static("public"))

//cookie parser
app.use(cookieParser())

import { userRouter } from "./routers/user.routes.js";
app.use("/api/v1/users",userRouter)

import { categoryRouter } from "./routers/category.route.js";
app.use("/api/v1/categories",categoryRouter);

import { productRouter } from "./routers/product.routes.js";
app.use("/api/v1/products",productRouter)

