import express from "express";
import { zaloLoginController } from "../controllers/userController";

const router = express.Router();

router.post("/zalo-login", zaloLoginController);

export default router;
