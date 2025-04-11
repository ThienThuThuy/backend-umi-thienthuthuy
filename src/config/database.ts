import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_URI as string;

// Kiểm tra xem biến môi trường đã được load chưa
if (!uri) {
    process.exit(1);
}

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

export async function connectDB() {
    try {
        await client.connect();
        return client.db("ZaloMiniApp");

    } catch (error) {
        console.error("❌ Database connection error:", error);
        process.exit(1);
    }
}

export { client };