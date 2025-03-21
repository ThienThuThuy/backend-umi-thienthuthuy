import { Router } from "express";
import { getUsers, addUser } from "../controllers/userController";

const router = Router();

router.get("/users", getUsers); // GET /api/users
router.post("/users", addUser); // POST /api/users

export default router;