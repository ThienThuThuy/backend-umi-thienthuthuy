import { Request, Response } from "express";
import { getAllUsers, createUser } from "../services/userService";

export const getUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: "Lỗi server!" });
    }
};

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            res.status(400).json({ message: "Thiếu thông tin!" });
            return;
        }
        const newUser = await createUser({ name, email, password, balance: 0 });
        res.status(201).json({ message: "Tạo người dùng thành công!", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Lỗi server!" });
    }
};



