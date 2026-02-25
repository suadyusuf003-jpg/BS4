import User from "./src/models/User.js";
import { ROLES } from "./src/config/constants.js";

const email = process.argv[2];

if (!email) {
    console.error("Please provide an email address.");
    console.error("Usage: node make-admin.js your-email@example.com");
    process.exit(1);
}

async function makeAdmin() {
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            console.error(`User with email ${email} not found.`);
            process.exit(1);
        }

        user.role = ROLES.ADMIN;
        await user.save();

        console.log(`✅ Success! User ${email} is now an ADMIN.`);
        process.exit(0);
    } catch (err) {
        console.error("❌ Error promoting user:", err.message);
        process.exit(1);
    }
}

makeAdmin();
