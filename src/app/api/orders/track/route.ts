import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const orderNumber = searchParams.get("orderNumber");
        const email = searchParams.get("email");

        if (!orderNumber || !email) {
            return NextResponse.json({ error: "Missing order number or email" }, { status: 400 });
        }

        const order = await prisma.order.findFirst({
            where: {
                orderNumber: orderNumber.trim(),
                email: {
                    equals: email.trim(),
                    mode: 'insensitive'
                }
            }
        });

        if (!order) {
            return NextResponse.json({ error: "Order not found. Please check your order number and email." }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            order: {
                orderNumber: order.orderNumber,
                status: order.status,
                flavorName: order.flavorName,
                quantity: order.quantity,
                total: order.total,
                createdAt: order.createdAt,
                updatedAt: order.updatedAt,
                firstName: order.firstName,
                lastName: order.lastName,
                city: order.city,
                paymentMethod: order.paymentMethod,
                paymentStatus: order.paymentStatus
            }
        });
    } catch (error) {
        console.error("Failed to track order:", error);
        return NextResponse.json({ error: "Failed to track order" }, { status: 500 });
    }
}
