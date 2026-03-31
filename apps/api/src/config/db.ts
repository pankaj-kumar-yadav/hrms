import mongoose from "mongoose"

export const connectDB = async (url: string): Promise<void> => {
    if(!url) {
        throw new Error("❌ MongoDB URI is not defined");
    }
    
    try {
        await mongoose.connect(url);
        console.log("✅ MongoDB connected");
    } catch (error) {
        console.error("❌ Failed to connect to MongoDB", error);
        process.exit(1);
    }
}