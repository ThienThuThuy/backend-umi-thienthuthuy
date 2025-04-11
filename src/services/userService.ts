import { connectDB } from "../config/database";
import { User, CreateUserResult } from "../models/userModel";

class UserService {
    private usersCollection: any;

    constructor() {
        this.init();
    }

    private async init() {
        try {
            const db = await connectDB();
            this.usersCollection = db.collection("users");

            // Tạo unique index cho zaloId (chặn trùng)
            await this.usersCollection.createIndex({ zaloId: 1 }, { unique: true });
        } catch (error) {
            console.error("Lỗi kết nối MongoDB hoặc tạo index:", error);
        }
    }

    /**
     * Nếu zaloId đã có → trả về user đó.
     * Nếu chưa có → tạo mới user và trả về.
     */
    public async findOrCreateZaloUser(user: Omit<User, "_id" | "password">): Promise<CreateUserResult> {
        if (!this.usersCollection) {
            return { success: false, message: "Chưa kết nối MongoDB!" };
        }

        const existingUser = await this.usersCollection.findOne({ zaloId: user.zaloId });

        if (existingUser) {
            return {
                success: true,
                user: {
                    zaloId: existingUser.zaloId,
                    name: existingUser.name,
                    avatar: existingUser.avatar,
                },
            };
        }

        try {
            const result = await this.usersCollection.insertOne(user);

            if (!result.insertedId) {
                return { success: false, message: "Không thể tạo người dùng mới!" };
            }

            return {
                success: true,
                user: {
                    zaloId: user.zaloId,
                    name: user.name,
                    avatar: user.avatar,
                },
            };
        } catch (error: any) {
            if (error.code === 11000) {
                // Trùng zaloId (race condition)
                const duplicatedUser = await this.usersCollection.findOne({ zaloId: user.zaloId });
                return {
                    success: true,
                    user: {
                        zaloId: duplicatedUser.zaloId,
                        name: duplicatedUser.name,
                        avatar: duplicatedUser.avatar,
                    },
                };
            }

            console.error("Lỗi khi tạo user:", error);
            return { success: false, message: "Lỗi không xác định khi tạo người dùng." };
        }
    }
}

export const userService = new UserService();
