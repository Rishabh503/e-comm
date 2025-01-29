import { Router } from "express";
import { createCategory } from "../controllers/category.controller.js";
import { upload } from "../middlewares/multerMiddleware.js";

export const categoryRouter=Router();
categoryRouter.route("/newCategory").post(createCategory)