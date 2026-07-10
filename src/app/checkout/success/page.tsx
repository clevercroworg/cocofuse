"use client";
 
import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Package, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { FLAVORS, FlavorID } from "@/context/FlavorContext";
import { trackPurchase } from "@/lib/tracking";
 
function SuccessContent() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get("id");
    
    // We fetch the real order info
    const [orderData, setOrderData] = React.useState<any>(null);
    const [loading, setLoading] = React.useState(true);
    const hasTracked = React.useRef(false);

    React.useEffect(() => {
        if (!orderId) {
            setLoading(false);
            return;
        }
        const fetchOrder = async () => {
            try {
                const res = await fetch(`/api/orders/${orderId}`);
                if (res.ok) {
                    const data = await res.json();
                    setOrderData(data.order);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchOrder();
    }, [orderId]);

    React.useEffect(() => {
        if (orderData && !hasTracked.current) {
            hasTracked.current = true;
            trackPurchase({
                transactionId: orderData.orderNumber,
                value: orderData.total,
                currency: "INR",
                flavor: orderData.flavor,
                flavorName: orderData.flavorName,
                quantity: orderData.quantity
            });
        }
    }, [orderData]);
    
    const flavorData = orderData ? FLAVORS[orderData.flavor as FlavorID] : null;

    if (loading) return <div className="min-h-screen bg-primary-white flex items-center justify-center">Loading...</div>;

    return (
        <main className="min-h-screen bg-primary-white py-24 md:py-32 font-body flex items-center justify-center overflow-hidden relative text-accent-premium">
            {/* Dynamic Aesthetic Blobs based on Flavor */}
            {flavorData && (
                <>
                    <div className="absolute top-0 right-0 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] rounded-full blur-[150px] opacity-20 pointer-events-none transform -translate-y-1/3 translate-x-1/3" style={{ backgroundColor: flavorData.liquid }} />
                    <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] max-w-[500px] max-h-[500px] rounded-full blur-[150px] opacity-20 pointer-events-none transform translate-y-1/3 -translate-x-1/3" style={{ backgroundColor: flavorData.cap }} />
                </>
            )}

            <div className="container mx-auto px-6 max-w-3xl relative z-10 text-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
                    className="w-24 h-24 md:w-32 md:h-32 bg-[#39FF14] rounded-full flex items-center justify-center mx-auto mb-10 shadow-[0_20px_50px_rgba(57,255,20,0.4)]"
                >
                    <CheckCircle2 className="w-12 h-12 md:w-16 md:h-16 text-black" />
                </motion.div>

                <motion.h1 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-5xl md:text-7xl font-heading font-black uppercase tracking-tighter mb-6 leading-tight"
                >
                    Order<br/>Confirmed!
                </motion.h1>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <p className="text-xl md:text-2xl font-body text-gray-500 mb-12 max-w-xl mx-auto leading-relaxed">
                        Hey there, {orderData ? orderData.firstName : 'legend'}. Your <strong className="text-accent-premium">{flavorData ? flavorData.name : <span className="font-wedges not-italic whitespace-nowrap"><span className="text-[#7ED956]">COCO</span><span className="text-[#3AB6FD]">FUSE.</span></span>} ({orderData ? orderData.quantity * 6 : 6}-Pack)</strong> order has been placed and is being prepped for shipment. Let's get hydrated!
                    </p>

                    <div className="bg-white/60 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] border border-white/60 shadow-[0_20px_60px_rgba(0,0,0,0.05)] mx-auto mb-12 flex flex-col md:flex-row items-center justify-around gap-8 text-left">
                        <div className="flex items-center gap-5 w-full md:w-auto">
                            <div className="p-4 bg-gray-100 rounded-2xl border border-gray-200">
                                <Package className="w-8 h-8 text-black" />
                            </div>
                            <div>
                                <h4 className="font-heading font-black uppercase text-xs tracking-widest text-gray-400 mb-1">Order Number</h4>
                                <p className="text-2xl font-heading font-black">{orderData ? orderData.orderNumber : '#CF-000000'}</p>
                            </div>
                        </div>
                        <div className="hidden md:block w-px h-16 bg-gray-200" />
                        <div className="flex items-center gap-5 w-full md:w-auto">
                            <div className="p-4 bg-gray-100 rounded-2xl border border-gray-200">
                                <CheckCircle2 className="w-8 h-8 text-black" />
                            </div>
                            <div>
                                <h4 className="font-heading font-black uppercase text-xs tracking-widest text-gray-400 mb-1">Status</h4>
                                <p className="text-2xl font-heading font-black">Processing</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/" className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-accent-premium text-white px-10 py-5 rounded-full font-heading font-black uppercase tracking-widest text-sm md:text-base hover:bg-black hover:scale-[1.02] active:scale-95 transition-all shadow-xl group">
                            Back to Home
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        {flavorData && (
                            <Link href={`/products/${flavorData.id}`} className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white text-accent-premium border-2 border-gray-200 px-10 py-4.5 rounded-full font-heading font-black uppercase tracking-widest text-sm md:text-base hover:bg-gray-50 hover:scale-[1.02] active:scale-95 transition-all group">
                                View {flavorData.id} Info
                            </Link>
                        )}
                    </div>
                </motion.div>
            </div>
        </main>
    );
}

export default function CheckoutSuccessPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-primary-white" />}>
            <SuccessContent />
        </Suspense>
    );
}
