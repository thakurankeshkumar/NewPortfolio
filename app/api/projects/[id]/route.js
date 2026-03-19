import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Project from "@/lib/models/Project";
import { verifyToken } from "@/lib/auth";

export async function PUT(req, { params }) {
    try {
        const decoded = verifyToken(req);
        if (!decoded) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        await connectDB();
        const body = await req.json();
        const project = await Project.findByIdAndUpdate(params.id, body, {
            new: true, runValidators: true,
        });
        if (!project) return NextResponse.json({ message: "Not found" }, { status: 404 });
        return NextResponse.json({ success: true, data: project });
    } catch (error) {
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    try {
        const decoded = verifyToken(req);
        if (!decoded) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        await connectDB();
        const project = await Project.findByIdAndDelete(params.id);
        if (!project) return NextResponse.json({ message: "Not found" }, { status: 404 });
        return NextResponse.json({ success: true, message: "Deleted" });
    } catch (error) {
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}