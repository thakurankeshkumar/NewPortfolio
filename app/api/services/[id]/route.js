import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Service from "@/lib/models/Service";
import { verifyToken } from "@/lib/auth";

export async function PUT(req, { params }) {
    try {
        const decoded = verifyToken(req);
        if (!decoded) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        await connectDB();
        const body = await req.json();
        const service = await Service.findByIdAndUpdate(params.id, body, {
            new: true, runValidators: true,
        });
        if (!service) return NextResponse.json({ message: "Not found" }, { status: 404 });
        return NextResponse.json({ success: true, data: service });
    } catch (error) {
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    try {
        const decoded = verifyToken(req);
        if (!decoded) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        await connectDB();
        const service = await Service.findByIdAndDelete(params.id);
        if (!service) return NextResponse.json({ message: "Not found" }, { status: 404 });
        return NextResponse.json({ success: true, message: "Deleted" });
    } catch (error) {
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}