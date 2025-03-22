import { connectDB } from "../config/database";
import type { User } from "../models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

let usersCollection: any;
connectDB()
    .then((db) => {
        usersCollection = db.collection("users");
    })
    .catch((error) => {
        console.error(error);
    });

// Hàm xử lí đăng kí người dùng mới
export const createUser = async (user: Omit<User, "_id">) => {
    if (!usersCollection) return { success: false, message: "Chưa kết nối MongoDB!" };

    const existingUser = await usersCollection.findOne({ email: user.email });
    if (existingUser) return { success: false, message: "Email đã tồn tại trong hệ thống!" };

    // Mã hóa mật khẩu trước khi lưu vào database
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const result = await usersCollection.insertOne({
        ...user,
        password: hashedPassword, // Lưu mật khẩu đã mã hóa
    });

    if (!result.insertedId) return { success: false, message: "Lỗi khi chèn dữ liệu vào MongoDB!" };

    return { success: true, user: { _id: result.insertedId, ...user, password: undefined } };
};

// Hàm xử lí đăng nhập
export const loginUser = async (email: string, password: string) => {
    if (!usersCollection) return { success: false, message: "Chưa kết nối MongoDB!" };
    const existingUser = await usersCollection.findOne({ email });
    if (!existingUser) return { success: false, message: "Email hoặc mật khẩu không đúng!" };

    // So sánh mật khẩu nhập vào với mật khẩu đã mã hóa trong database
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) return { success: false, message: "Email hoặc mật khẩu không đúng!" };

    // Tạo JWT Token
    const token = jwt.sign(
        { userId: existingUser._id, email: existingUser.email },
        process.env.JWT_SECRET as string,
        { expiresIn: "7d" }
    );
    return { success: true, message: "Đăng nhập thành công!", user: { ...existingUser, password: undefined } };
};
