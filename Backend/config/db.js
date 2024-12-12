import mongoose from "mongoose";
import { ENV_VARS } from "./envVars.js";


export const connectDB = async () => {

    try {
        const conn = await mongoose.connect(ENV_VARS.MONGO_URI)
        console.log("MongoBD connected:" + conn.connection.host);
        
    }
    catch (error){
        console.error("Error connecting to mongoDB:" + error.message)
        process.exit(1); // 1 means there is an error , 0 means Sucess
    }
}