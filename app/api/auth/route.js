import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Admin from "@/lib/models/Admin";
import jwt from "jsonwebtoken"


export async function POST(req) {
    try {
        await connectDB();
        const { email, password } = await req.json()
        if (!email || !password) {
            return NextResponse.json(
                { message: "Email and Password are required" },
                { status: 400 }
            );
        }

        const admin = await Admin.findOne({ email }).select("+password");
        if (!admin || !(await admin.comparePassword(password))) {
            return NextResponse.json(
                { message: "Invalid Crediantials" },
                { status: 401 }
            );
        }

        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "7d" })

        return NextResponse.json({
            sucess: true,
            token,
            admin: {
                id: admin._id,
                email: admin.email
            },
        });
    } catch (error) {
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}