import 'dotenv/config';
import app from "./app.js";
import prisma from "./lib/prisma.js";

const startServer = async () => {
    try {
        await prisma.$connect();

        console.log("Database connected successfully");

        app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`);
        });
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
};

startServer();