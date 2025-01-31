import { Router } from "express";
import { createCategory, getAllCategories } from "../controllers/category.controller.js";
import { upload } from "../middlewares/multerMiddleware.js";

export const categoryRouter=Router();
categoryRouter.route("/newCategory").post(createCategory)
categoryRouter.route("/allCategories").get(getAllCategories)
