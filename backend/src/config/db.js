import mongoose from "mongoose";

export const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log('database connected succesfuly')
    } catch (error) {
      console.error("error connecting to DB", error)
      process.exit(1) // 1 exit with failure, 0 - Success   
    }
};