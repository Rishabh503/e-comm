import { Router } from "express";
import { getAllComplaint, getOneComplaint, newComplaint } from "../controllers/complaint.controller.js";

export const complaintRouter=Router();
complaintRouter.route('/newComplaint/:userId').post(newComplaint)
complaintRouter.route('/allComplaints').get(getAllComplaint)
complaintRouter.route('/getComplaint/:complaintId').get(getOneComplaint);
