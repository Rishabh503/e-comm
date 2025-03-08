import { Router } from "express";
import { createCategory, getAllCategories, getCategory, updateCategory } from "../controllers/category.controller.js";
import { upload } from "../middlewares/multerMiddleware.js";

export const categoryRouter=Router();
categoryRouter.route("/newCategory").post(upload.single("poster"),createCategory)
categoryRouter.route("/allCategories").get(getAllCategories)
categoryRouter.route("/updateCategory/:categoryName").post(updateCategory)
categoryRouter.route("/getCategory").get(getCategory)

