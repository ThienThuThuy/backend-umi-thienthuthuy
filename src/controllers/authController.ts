import { Request, Response } from "express";
import { createUser } from "../services/userService";
import { loginUser } from "../services/userService";

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            res.status(400).json({ success: false, message: "Thiếu thông tin!" });
            return;
        }

        const result = await createUser({ name, email, password, balance: 0 });

        if (!result.success) {
            res.status(400).json(result); // Trả về lỗi nếu createUser thất bại
            return;
        }

        res.status(201).json({ message: "Tạo người dùng thành công!", user: result.user });
    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi server!" });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: "Thiếu thông tin!" });
            return;
        }

        const result = await loginUser(email, password);
        if (!result.success) {
            res.status(401).json(result);
            return;
        }

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Lỗi server!" });
    }
};
