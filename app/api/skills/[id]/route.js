import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import SkillCategory from "@/lib/models/SkillCategory";
import { verifyToken } from "@/lib/auth";

// PUT /api/skills/:id — admin only
export async function PUT(req, { params }) {
    try {
        const decoded = verifyToken(req);
        if (!decoded) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        await connectDB();
        const body = await req.json();
        const category = await SkillCategory.findByIdAndUpdate(params.id, body, {
            new: true, runValidators: true,
        });
        if (!category) return NextResponse.json({ message: "Not found" }, { status: 404 });
        return NextResponse.json({ success: true, data: category });
    } catch (error) {
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}

// DELETE /api/skills/:id — admin only
export async function DELETE(req, { params }) {
    try {
        const decoded = verifyToken(req);
        if (!decoded) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        await connectDB();
        const category = await SkillCategory.findByIdAndDelete(params.id);
        if (!category) return NextResponse.json({ message: "Not found" }, { status: 404 });
        return NextResponse.json({ success: true, message: "Deleted" });
    } catch (error) {
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}