import mongoose from 'mongoose';

let isConnected=false;

export async function connectDb(){
    try {
        if(isConnected){
            console.log("MongoBD is already connected");
            return;
        }

        if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in the environment variables");
        }

        await mongoose.connect(process.env.MONGO_URI);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log("MongoDB connected successfully");
            isConnected = true;
        });
        connection.on('error', (err) => {
            console.error("MongoDB connection error:", err);
            isConnected = false;
        });

    } catch (error) {
        console.log("Error connecting to the database:",error);
        process.exit(1);
    }
}