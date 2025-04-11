import express from "express";
import { controllerGroup } from "../controllers/groupController";

const router = express.Router();

router.post("/groups", controllerGroup);

export default router;
