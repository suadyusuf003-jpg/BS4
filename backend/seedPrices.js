import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import sequelize from "./src/config/db.js";
import Room from "./src/models/Room.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });

const roomPrices = {
    "Board Room": 1000,
    "Creative Studio": 1000,
    "Innovation Lab": 1500,
    "Training Room": 2000,
    "Co-working Space": 3000,
    "Conference Hall A": 5000,
    "Conference Hall": 5000,
};

async function seed() {
    try {
        await sequelize.authenticate();
        console.log("Database connected.");

        for (const [name, price] of Object.entries(roomPrices)) {
            const room = await Room.findOne({ where: { name } });
            if (room) {
                room.hourlyPrice = price;
                await room.save();
                console.log(`Updated ${name} with price ${price}`);
            } else {
                // If room doesn't exist, create it (optional, but good for completeness)
                await Room.create({
                    name,
                    capacity: name === "Conference Hall" ? 100 : 10, // dummy capacity
                    description: `A professional ${name.toLowerCase()}.`,
                    hourlyPrice: price,
                });
                console.log(`Created ${name} with price ${price}`);
            }
        }

        console.log("Seeding completed successfully.");
        process.exit(0);
    } catch (error) {
        console.error("Seeding failed:", error);
        process.exit(1);
    }
}

seed();
