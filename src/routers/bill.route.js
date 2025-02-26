import { Router } from "express";
import { createNewBill ,getAllBills,deleteAllData } from "../controllers/bill.controller.js";
export const billRouter=Router()
billRouter.route('/newBill').post(createNewBill)
billRouter.route('/getAllBills').get(getAllBills)
billRouter.route('/deleteALLBills').delete(deleteAllData)