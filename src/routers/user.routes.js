import {Router} from "express";
import { loggoutUser, login, registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multerMiddleware.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";


export const userRouter=Router();

userRouter.route('/register').post(
    upload.single("avatar")
    ,registerUser)

userRouter.route('/login').post(upload.single(),login)

userRouter.route('/logout').post(verifyJWT,loggoutUser)