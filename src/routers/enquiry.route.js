
import { Router } from "express";
import { newEnquiry,getAllEnquiries, newFollowUp, newVisit ,getEnquiry } from "../controllers/enquiry.controlle.js";
export const enquiryRouter=Router()

enquiryRouter.route("/newEnquiry").post(newEnquiry)
enquiryRouter.route("/getALlEnquires").get(getAllEnquiries)
enquiryRouter.route("/getEnquiry/:enquiryId").get(getEnquiry)
enquiryRouter.route("/:enquiryId/followup").post(newFollowUp)
enquiryRouter.route("/:enquiryId/visit").post(newVisit)