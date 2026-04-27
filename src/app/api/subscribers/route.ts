import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

// Get all subscribers (Admin only)
export async function GET() {
    try {
        const session = await getSession();
        if (!session || session.role !== "admin") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        
        const subscribers = await prisma.subscriber.findMany({
            orderBy: { subscribedAt: "desc" }
        });
        
        return NextResponse.json({ subscribers });
    } catch (error) {
        console.error("Failed to fetch subscribers:", error);
        return NextResponse.json({ error: "Failed to fetch subscribers" }, { status: 500 });
    }
}
