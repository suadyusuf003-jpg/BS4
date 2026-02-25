import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });

console.log("Connecting to:", {
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD ? "****" : "(none)"
});

const sequelize = new Sequelize(
    process.env.DB_NAME || "swahilipot",
    process.env.DB_USER || "root",
    process.env.DB_PASSWORD || "",
    {
        host: process.env.DB_HOST || "localhost",
        dialect: "mysql",
        logging: false,
    }
);

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log("✅ Success! Connection has been established successfully.");
    } catch (error) {
        console.error("❌ ERROR DETAILS:", error);
    } finally {
        process.exit();
    }
}

testConnection();
