import mongoose from "mongoose";

const connectDataBase=async()=>{
    try {
        // console.log(process.env.MONOGODB_URI)
        const connectionDB=await mongoose.connect(`${process.env.MONOGODB_URI}`)
        // co/
    } catch (error) {
        console.log("error while connecting the database in db/index.js: ",error)
    }
}

export default connectDataBase;