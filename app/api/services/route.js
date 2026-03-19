import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Service from "@/lib/models/Service";
import { verifyToken } from "@/lib/auth";

export async function GET() {
    try {
        await connectDB();
        const services = await Service.find().sort({ order: 1 });
        return NextResponse.json({ success: true, data: services });
    } catch (error) {
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const decoded = verifyToken(req);
        if (!decoded) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        await connectDB();
        const body = await req.json();
        const service = await Service.create(body);
        return NextResponse.json({ success: true, data: service }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Server error" }, { status: 500 });
    }
}