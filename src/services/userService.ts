import { connectDB } from "../config/database";

let usersCollection: any;

connectDB().then((db) => {
    usersCollection = db.collection("users");
}).catch((error) => {
    console.error(error);
});

// Hàm xử lí đăng kí người dùng
export const createUser = async (user: { name: string; email: string; password: string; balance: number }) => {
    if (!usersCollection) throw new Error("Chưa kết nối MongoDB!");

    const existingUser = await usersCollection.findOne({ email: user.email });
    if (existingUser) {
        throw new Error("Email đã tồn tại!");
    }

    const result = await usersCollection.insertOne(user);

    if (!result.insertedId) {
        throw new Error("Lỗi khi chèn dữ liệu vào MongoDB!");
    }
    return { _id: result.insertedId, ...user };
};
