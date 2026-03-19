import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import About from "@/lib/models/About";
import { verifyToken } from "@/lib/auth";

export async function GET() {
    try {
        await connectDB();
        const about = await About.findOne();
        if (!about) return NextResponse.json({ message: "Not found" }, { status: 404 });
        return NextResponse.json({ success: true, data: about });
    } catch (error) {
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}

export async function PUT(req) {
    try {
        const decoded = verifyToken(req);
        if (!decoded) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        await connectDB();
        const body = await req.json();
        const about = await About.findOneAndUpdate({}, body, {
            new: true,
            upsert: true,
            runValidators: true,
        });
        return NextResponse.json({ success: true, data: about });
    } catch (error) {
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}