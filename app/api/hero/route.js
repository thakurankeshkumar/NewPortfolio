import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Hero from "@/lib/models/Hero";
import { verifyToken } from "@/lib/auth";

// GET /api/hero — public
export async function GET() {
    try {
        await connectDB();
        const hero = await Hero.findOne();
        if (!hero) return NextResponse.json({ message: "Not found" }, { status: 404 });
        return NextResponse.json({ success: true, data: hero });
    } catch (error) {
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}

// PUT /api/hero — admin only
export async function PUT(req) {
    try {
        const decoded = verifyToken(req);
        if (!decoded) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        await connectDB();
        const body = await req.json();

        const hero = await Hero.findOneAndUpdate({}, body, {
            new: true,
            upsert: true,
            runValidators: true,
        });

        return NextResponse.json({ success: true, data: hero });
    } catch (error) {
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}