// controllers/userController.ts
import { Request, Response } from "express";
import { userService } from "../services/userService";

export const zaloLoginController = async (req: Request, res: Response) => {
    const { zaloId, name, avatar } = req.body;

    if (!zaloId || !name) {
        res.status(400).json({ success: false, message: "Thiếu thông tin người dùng!" });
        return;
    }

    const result = await userService.findOrCreateZaloUser({ zaloId, name, avatar });
    res.status(result.success ? 200 : 500).json(result);
};
