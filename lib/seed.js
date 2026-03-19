// Step 1: load env FIRST using createRequire trick for ESM
import { createRequire } from "module";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env.local before anything else
dotenv.config({ path: resolve(__dirname, "../.env.local") });

// Step 2: NOW import db stuff after env is loaded
const { default: connectDB } = await import("./mongodb.js");
const { default: Admin } = await import("./models/Admin.js");

async function seed() {
    try {
        await connectDB();

        const existing = await Admin.findOne({ email: "admin@yourportfolio.com" });
        if (existing) {
            console.log("⚠️  Admin already exists");
            process.exit(0);
        }

        await Admin.create({
            email: "admin@yourportfolio.com",
            password: "yourpassword123",
        });

        console.log("✅ Admin created successfully!");
        process.exit(0);
    } catch (error) {
        console.error("❌ Seed failed:", error.message);
        process.exit(1);
    }
}

seed();