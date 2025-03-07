import { Router } from "express";
import { getAllComplaint, getOneComplaint, newComplaint,newVisit,newFollowUp } from "../controllers/complaint.controller.js";
// import { newFollowUp } from "../controllers/enquiry.controlle.js";

export const complaintRouter=Router();
complaintRouter.route('/newComplaint/:userId').post(newComplaint)
complaintRouter.route('/allComplaints').get(getAllComplaint)
complaintRouter.route('/getComplaint/:complaintId').get(getOneComplaint);
complaintRouter.route('/:complaintId/newVisit').post(newVisit);
complaintRouter.route('/:complaintId/followUp').post(newFollowUp);

