"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, Search, Package, CheckCircle2, Truck, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function TrackContent() {
    const searchParams = useSearchParams();
    const [orderNumber, setOrderNumber] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [order, setOrder] = useState<any>(null);

    // Auto-track on load if query params are present
    useEffect(() => {
        const orderNumParam = searchParams.get("orderNumber");
        const emailParam = searchParams.get("email");
        
        if (orderNumParam) setOrderNumber(orderNumParam);
        if (emailParam) setEmail(emailParam);

        if (orderNumParam && emailParam) {
            const autoTrack = async () => {
                setLoading(true);
                setError("");
                try {
                    const res = await fetch(`/api/orders/track?orderNumber=${encodeURIComponent(orderNumParam.trim())}&email=${encodeURIComponent(emailParam.trim())}`);
                    const data = await res.json();
                    
                    if (!res.ok) {
                        setError(data.error || "Failed to find order.");
                    } else {
                        setOrder(data.order);
                    }
                } catch (err) {
                    setError("Something went wrong. Please try again later.");
                } finally {
                    setLoading(false);
                }
            };
            autoTrack();
        }
    }, [searchParams]);

    const handleTrack = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setOrder(null);

        try {
            const res = await fetch(`/api/orders/track?orderNumber=${encodeURIComponent(orderNumber.trim())}&email=${encodeURIComponent(email.trim())}`);
            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Failed to find order.");
            } else {
                setOrder(data.order);
            }
        } catch (err) {
            setError("Something went wrong. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const getStatusIndex = (status: string) => {
        switch (status) {
            case "pending": return 0;
            case "confirmed": return 1;
            case "shipped": return 2;
            case "delivered": return 3;
            default: return 0;
        }
    };

    const steps = [
        { label: "Order Placed", desc: "We've received your order." },
        { label: "Confirmed", desc: "Your order is confirmed." },
        { label: "Shipped", desc: "Your package is on its way." },
        { label: "Delivered", desc: "Stay hydrated!" }
    ];

    const currentStep = order ? getStatusIndex(order.status) : 0;

    return (
        <main className="min-h-screen bg-primary-white py-24 md:py-32 font-body text-accent-premium relative overflow-hidden flex items-center justify-center">
            {/* Ambient Background Blobs */}
            <div className="absolute top-[-10vw] right-[-10vw] w-[50vw] h-[50vw] bg-[#7ED956]/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10vw] left-[-10vw] w-[45vw] h-[45vw] bg-[#3AB6FD]/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 max-w-2xl relative z-10">
                <Link href="/" className="inline-flex items-center text-[#111111]/60 hover:text-black transition-colors w-max uppercase text-xs font-heading font-black tracking-widest mb-8">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
                </Link>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-black italic uppercase tracking-tighter text-[#111111] mb-8 leading-none">
                    TRACK YOUR <br />
                    <span className="text-[#3AB6FD]">FUSE.</span>
                </h1>

                {/* Form Card */}
                <div className="bg-white border-4 border-[#111111] shadow-[8px_8px_0px_#111111] rounded-[2.5rem] p-6 md:p-10 mb-8">
                    <form onSubmit={handleTrack} className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="orderNumber" className="font-heading font-black uppercase tracking-widest text-[#111111] text-xs px-1">Order Number</label>
                            <input
                                type="text"
                                id="orderNumber"
                                placeholder="CF-123456"
                                value={orderNumber}
                                onChange={(e) => setOrderNumber(e.target.value)}
                                className="w-full px-5 py-4 border-2 border-gray-200 focus:border-[#3AB6FD] rounded-2xl font-body focus:outline-none transition-colors"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="font-heading font-black uppercase tracking-widest text-[#111111] text-xs px-1">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="alex@gmail.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-5 py-4 border-2 border-gray-200 focus:border-[#3AB6FD] rounded-2xl font-body focus:outline-none transition-colors"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full mt-2 py-4 bg-[#39FF14] text-black border-2 border-[#111111] shadow-[4px_4px_0px_#111111] hover:shadow-[6px_6px_0px_#111111] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[2px_2px_0px_#111111] rounded-2xl font-heading font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <span>Searching...</span>
                            ) : (
                                <>
                                    <Search className="w-5 h-5" strokeWidth={3} />
                                    <span>Track Order</span>
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Error Banner */}
                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="p-5 bg-red-50 border-2 border-red-500 rounded-2xl text-red-600 text-sm font-body font-bold mb-8 text-center shadow-md"
                        >
                            {error}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Results Card */}
                <AnimatePresence>
                    {order && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-[#111111] text-white border-4 border-[#111111] shadow-[8px_8px_0px_#7ED956] rounded-[2.5rem] p-6 md:p-10 flex flex-col gap-8"
                        >
                            {/* Order Header */}
                            <div className="flex justify-between items-start border-b border-white/10 pb-6 flex-wrap gap-4">
                                <div>
                                    <h3 className="font-heading font-black text-2xl text-[#7ED956] uppercase tracking-wide">{order.orderNumber}</h3>
                                    <p className="text-white/50 text-xs mt-1 uppercase tracking-widest font-heading">
                                        Ordered on {new Date(order.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="bg-[#3AB6FD] text-black px-4 py-2 rounded-xl font-heading font-black uppercase text-xs tracking-wider">
                                    {order.status}
                                </div>
                            </div>

                            {/* Stepper Timeline */}
                            <div className="flex flex-col gap-6 relative">
                                {steps.map((step, idx) => {
                                    const isCompleted = idx <= currentStep;

                                    return (
                                        <div key={idx} className="flex gap-4 items-start relative z-10">
                                            {/* Stepper Node */}
                                            <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-300 ${
                                                isCompleted 
                                                ? 'bg-[#39FF14] text-black border-transparent shadow-[0_0_15px_rgba(57,255,20,0.4)]' 
                                                : 'bg-neutral-800 text-white/40 border-neutral-700'
                                            }`}>
                                                {idx === 0 && <ShoppingBag className="w-4 h-4" strokeWidth={isCompleted ? 3 : 2} />}
                                                {idx === 1 && <CheckCircle2 className="w-4 h-4" strokeWidth={isCompleted ? 3 : 2} />}
                                                {idx === 2 && <Truck className="w-4 h-4" strokeWidth={isCompleted ? 3 : 2} />}
                                                {idx === 3 && <Package className="w-4 h-4" strokeWidth={isCompleted ? 3 : 2} />}
                                            </div>

                                            {/* Text Info */}
                                            <div>
                                                <h4 className={`font-heading font-black uppercase text-sm tracking-wider ${isCompleted ? 'text-white' : 'text-white/40'}`}>
                                                    {step.label}
                                                </h4>
                                                <p className="text-white/50 text-xs font-body mt-0.5">{step.desc}</p>
                                            </div>

                                            {/* Connecting Line */}
                                            {idx < steps.length - 1 && (
                                                <div className={`absolute left-4 top-8 w-[2px] h-[calc(100%+8px)] -translate-x-1/2 z-0 ${
                                                    idx < currentStep ? 'bg-[#39FF14]' : 'bg-neutral-800'
                                                }`} />
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Order Details Summary */}
                            <div className="border-t border-white/10 pt-6 mt-2 flex flex-col gap-4">
                                <div className="flex justify-between items-center text-sm font-body">
                                    <span className="text-white/50 font-heading font-black uppercase tracking-wider text-xs">Item Purchased</span>
                                    <span className="font-bold text-white text-right">{order.flavorName} ({order.quantity} x 6-Pack)</span>
                                </div>
                                <div className="flex justify-between items-center text-sm font-body">
                                    <span className="text-white/50 font-heading font-black uppercase tracking-wider text-xs">Delivery City</span>
                                    <span className="font-bold text-white">{order.city}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm font-body">
                                    <span className="text-white/50 font-heading font-black uppercase tracking-wider text-xs">Payment Method</span>
                                    <span className="font-bold text-white uppercase">{order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online'}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm font-body">
                                    <span className="text-white/50 font-heading font-black uppercase tracking-wider text-xs">Total Amount</span>
                                    <span className="font-heading font-black text-lg text-[#39FF14]">₹{order.total.toFixed(2)}</span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </main>
    );
}

export default function TrackOrderPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-primary-white" />}>
            <TrackContent />
        </Suspense>
    );
}
