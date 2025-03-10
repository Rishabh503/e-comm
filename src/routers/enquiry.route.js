
import { Router } from "express";
import { newEnquiry,getAllEnquiries, newFollowUp, newVisit ,getEnquiry, newQuotation } from "../controllers/enquiry.controlle.js";
import { upload } from "../middlewares/multerMiddleware.js";
export const enquiryRouter=Router()

enquiryRouter.route("/newEnquiry").post(newEnquiry)
enquiryRouter.route("/getALlEnquires").get(getAllEnquiries)
enquiryRouter.route("/getEnquiry/:enquiryId").get(getEnquiry)
enquiryRouter.route("/:enquiryId/followup").post(newFollowUp)
enquiryRouter.route("/:enquiryId/visit").post(newVisit)
enquiryRouter.route("/:enquiryId/quotation").post(upload.single("file"),newQuotation)

// userRouter.route('/register').post(
//     upload.single("avatar")
//     // ,registerUser)