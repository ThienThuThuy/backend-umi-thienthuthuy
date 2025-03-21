import { User } from "../models/userModel";
import { connectDB } from "../config/database";


export const getAllUsers = async (): Promise<User[]> => {
    const db = await connectDB();
    return db.collection<User>("users").find().toArray();
};

export const createUser = async (user: Omit<User, "_id">): Promise<User> => {
    const db = await connectDB();
    const result = await db.collection<User>("users").insertOne({ ...user });
    return { ...user, _id: result.insertedId }; // Trả về user có _id từ MongoDB
};