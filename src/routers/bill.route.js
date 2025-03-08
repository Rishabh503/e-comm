import { Router } from "express";
import { createNewBill ,getAllBills,deleteAllData,showBill ,userBill,getOneBill } from "../controllers/bill.controller.js";
import { upload } from "../middlewares/multerMiddleware.js";
export const billRouter=Router()
billRouter.route('/newBill').post(createNewBill)
billRouter.route('/oldUserBill/:userId').post(upload.single("bill"),userBill)
billRouter.route('/getAllBills').get(getAllBills)
billRouter.route('/getOneBill/:billId').get(getOneBill)
billRouter.route('/deleteALLBills').delete(deleteAllData)
billRouter.route('/showBill/:billId').get(showBill)