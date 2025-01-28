import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";


export const app=express();

// isme 2 -3 steps krne h

// config cors cookieparser and 2-3 express middlewares 

// cors
app.use(cors({
    origin:procces.env.CORS_ORIGIN,
    credentials:true
}))


//express ke 
app.use(express.json({limit:"16kb"}))

app.use(express.urlencoded({extended:true}))

app.use(express.static("public"))

//cookie parser
app.use(cookieParser())

