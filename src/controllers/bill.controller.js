import { Bill } from "../models/bill.model.js";
import { Category } from "../models/category.model.js";
import { User } from "../models/user.model.js";
import { Reminder } from "../models/reminder.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// export const createNewReminder=asyncHandler(async(_,res)=>{

// })

export const createNewReminder=async(billNo,date,status,)=>{
        try {
            const reminder=await Reminder.create(
                {
                    billNo:billNo,
                    date:date,
                    status:status
                }
            )
    
            const createdReminder=await Reminder.findById(reminder._id)
            if(!createdReminder) throw new ApiError(401,"error in making the reminder")
            console.log(reminder)
            return reminder._id;
        } catch (error) {
            console.log("error in creating reminder",error)
            return null;
        }
}

export const createMultipleReminders=async(biilNo,date,status,gap,warranty)=>{
    let reminders=[];
    let i=gap;
    let newDate=new Date(date);
    while(i<warranty*12){
        
        newDate.setMonth(newDate.getMonth()+gap)
        const reminder=await createNewReminder(biilNo,newDate,status);
        reminders=[reminder,...reminders]
        i=i+gap;
    }
    return reminders;
}

export const createNewBill=asyncHandler(async(req,res)=>{
    // console.log(req.body)
    const {billTo,amount,contact,email,category,status,warranty,remValue1}=req.body;
    // console.log(req.body,billTo)
    if(!billTo || !amount  || !contact ||!email || !category || !status || !warranty) {throw new ApiError(401,"all fields are required")}

    const billedUser=await User.findOne({username:billTo})
    if(!billedUser) throw new ApiError(401,"error in finding user or user doesnt exists")
    
    const categoryTo= await Category.findOne({name:category})

    if(!categoryTo) throw new ApiError(401,"catergory doesnt exists")
    
    const bill= await Bill.create({
        billTo:billedUser._id,
        amount:amount,
        contact:contact,
        email:email,
        category:category._id,
        status:status,
        warranty:warranty,
    })
    const createdBill =await Bill.findById(bill._id)
    if(!createdBill) throw new ApiError(401,"error creating a bill")
        const createAt=createdBill.createdAt;
    //lets make first reminder
    // const reminderOne= await createNewReminder(bill._id,createAt,status);
    // console.log(reminderOne);

    const remindersArray=await createMultipleReminders(bill._id,createAt,status,remValue1,warranty);
    console.log("from second methods",remindersArray)

    console.log("bill before reminders",bill)
    bill.reminder.push(...remindersArray);
    await bill.save();
    // await Bill.findByIdAndUpdate(
    //     createdBill._id,
    //     { $set: { reminder: remindersArray } }, 
    //     { new: true }
    // );
    

    console.log("bill after save",bill)
    // console.log(typeof createAt,createAt,createAt instanceof Date)
    // console.log(createdBill,createdBill.createdAt);

   
    return res.status(201).json(
        new ApiResponse(200,bill,"bill has been made")
    )
    
})

export const getAllBills=asyncHandler(async(req,res)=>{
    const allBills=await Bill.find()
    .populate("billTo")
    .populate("reminder")
   
    if(!allBills) throw new ApiError(402,"erroe getting bills from the db")
    console.log(allBills);
    return res.status(200).json( new ApiResponse(200,allBills,"bills fetched done"))
})


export const deleteAllData = asyncHandler(async (req, res) => {
    await Bill.deleteMany({});
    await Reminder.deleteMany({});
    console.log("All bills and reminders deleted!");

    return res.status(200).json(new ApiResponse(200, null, "All data deleted successfully"));
});
