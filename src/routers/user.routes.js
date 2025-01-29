import {Router} from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multerMiddleware.js";


export const userRouter=Router();

userRouter.route('/register').post(
    upload.single("avatar")
    ,registerUser)