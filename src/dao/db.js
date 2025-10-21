import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/libreriasv";

export async function connectDB() {
    try {
    await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log("🟢 Conectado a MongoDB");
    } catch (err) {
    console.error("🔴 Error conectando a MongoDB:", err);
    throw err;
    }
}