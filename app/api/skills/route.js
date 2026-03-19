import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import SkillCategory from "@/lib/models/SkillCategory";
import { verifyToken } from "@/lib/auth";

// GET /api/skills — public
export async function GET() {
    try {
        await connectDB();
        const skills = await SkillCategory.find().sort({ order: 1 });
        return NextResponse.json({ success: true, data: skills });
    } catch (error) {
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}

// POST /api/skills — admin only
export async function POST(req) {
    try {
        const decoded = verifyToken(req);
        if (!decoded) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        await connectDB();
        const body = await req.json();
        const category = await SkillCategory.create(body);
        return NextResponse.json({ success: true, data: category }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}