import express, { Request, Response } from 'express';
import userRoutes from './routes/userRoutes';
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript and Express!');
});

app.use("/api", userRoutes);

app.listen(PORT, () => {
    console.log(`🚀 http://localhost:${PORT}`);
});
