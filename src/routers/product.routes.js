import { Router } from "express"
import { addProduct, allProducts } from "../controllers/products.controller.js"
import { upload } from "../middlewares/multerMiddleware.js"

export const productRouter=Router()
productRouter.route("/addProduct").post(upload.fields([
        {
            name:"photo1",
            maxCount:1
        },{
            name:"photo2",
            maxCount:1
        }
    ]),addProduct)

productRouter.route("/showAllProducts/:categoryName").get(allProducts)