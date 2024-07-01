import mongoose from "mongoose";

const connectDB = async ()=> {
    try {
        console.log("DB URL ", process.env.MONGODB_URI );
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`)
        console.log("\nMongoDB Connected !! DB Host:", connectionInstance.connection.host);
        console.log("DB Name:", connectionInstance.connection.name);
    } catch (error) {
        console.error('MongoDB Connection Failed: ', error);
        process.exit(1)
    }
}

export default connectDB;