import express, { Request, Response } from 'express';
import authRoutes from './routes/authRoutes';

import dotenv from "dotenv";
import { apiLimiter } from "./middlewares/rateLimiter";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript and Express!');
});

app.use("/api", apiLimiter);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
