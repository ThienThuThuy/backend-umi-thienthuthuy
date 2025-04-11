import express, { Request, Response } from 'express';
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from './routes/userRoutes';
import groupRoutes from './routes/groupRouter';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript and Express!');
});

app.use("/api", userRoutes);
app.use("/api", groupRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Server running at: http://localhost:${PORT}`);
});
