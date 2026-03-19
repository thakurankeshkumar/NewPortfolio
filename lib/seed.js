import "dotenv/config";
import { config } from "dotenv";
import { resolve } from "path";

// Load .env.local explicitly
config({ path: resolve(process.cwd(), ".env.local") });

import connectDB from "./mongodb.js";
import Admin from "./models/Admin.js";

async function seed() {
    await connectDB();

    const existing = await Admin.findOne({ email: "admin@yourportfolio.com" });
    if (existing) {
        console.log("Admin already exists");
        process.exit(0);
    }

    await Admin.create({
        email: "admin@yourportfolio.com",
        password: "yourpassword123",
    });

    console.log("✅ Admin created successfully");
    process.exit(0);
}

seed();