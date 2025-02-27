
import { Router } from "express";
import { newEnquiry,getAllEnquiries, newFollowUp, newVisit } from "../controllers/enquiry.controlle.js";
export const enquiryRouter=Router()

enquiryRouter.route("/newEnquiry").post(newEnquiry)
enquiryRouter.route("/getALlEnquires").get(getAllEnquiries)
enquiryRouter.route("/:enquiryId/followup").post(newFollowUp)
enquiryRouter.route("/:enquiryId/visit").post(newVisit)