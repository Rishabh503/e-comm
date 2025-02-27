import mongoose, { Mongoose, Schema } from "mongoose";

const followUpSchema = new mongoose.Schema({
    name: { type: String, required: true },
    date: { type: Date, default: Date.now },
    contact: { type: String, required: true },
    text: { type: String, required: true },
    file: { type: String }, // File path or URL
    // referenceType: {
    //     type: String,
    //     enum: ["enquiry", "complaint"],
    //     required: true
    // },
    // referenceId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     refPath: "referenceType" // Dynamic reference
    // }
    enquiryRef:{
        type:Schema.Types.ObjectId,
        ref:"Enquiry"
    },
    complaintRef:{
         type:Schema.Types.ObjectId,
        ref:"Complaint"
    }
});

export const FollowUp = mongoose.model("FollowUp", followUpSchema);

