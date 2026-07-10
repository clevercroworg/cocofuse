"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowLeft, CreditCard, ShieldCheck, ShoppingBag, Truck } from "lucide-react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const Scene = dynamic(() => import("@/components/Scene"), { ssr: false });
import { useFlavor, FLAVORS, FlavorID } from "@/context/FlavorContext";

const InputField = ({ label, name, type = "text", placeholder, width = "w-full", value, onChange, error, readOnly = false }: any) => (
    <div className={`flex flex-col gap-2 ${width}`}>
        <label htmlFor={name} className="font-heading font-black uppercase tracking-widest text-[#0A0A0A] text-xs px-1">
            {label}
        </label>
        <input
            type={type}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            readOnly={readOnly}
            className={`w-full px-5 py-4 border rounded-2xl font-body focus:outline-none focus:ring-2 transition-all shadow-sm ${
                readOnly ? 'bg-gray-50 text-gray-500 cursor-not-allowed border-gray-200' : 'bg-white text-gray-800'
            } ${
                error 
                ? 'border-red-500 focus:ring-red-500' 
                : 'border-gray-200 focus:ring-accent-premium/20 focus:border-accent-premium'
            }`}
            required
        />
        {error && (
            <span className="text-red-500 text-xs px-1 font-body font-medium">{error}</span>
        )}
    </div>
);

function CheckoutContent() {
    const { flavorData: defaultFlavorData } = useFlavor();
    const searchParams = useSearchParams();
    const router = useRouter();
    const flavorQuery = searchParams.get("flavor") as FlavorID;
    const packQuery = searchParams.get("pack") || "1";
    const flavorData = (flavorQuery && FLAVORS[flavorQuery]) ? FLAVORS[flavorQuery] : defaultFlavorData;

    const quantity = parseInt(packQuery, 10) || 1;
    const getPrice = (qty: number) => {
        return qty * 300;
    };
    const subtotal = getPrice(quantity);
    const shipping = 69;
    const total = (subtotal + shipping).toFixed(2);

    const [mounted, setMounted] = useState(false);

    // Ensure hydration mismatch doesn't occur with context
    useEffect(() => {
        setMounted(true);
    }, []);

    // Form state
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "Mumbai",
        state: "Maharashtra",
        zip: "",
    });
    const [pincodeError, setPincodeError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const isValidPincode = (pincodeStr: string): boolean => {
        const pin = parseInt(pincodeStr, 10);
        if (isNaN(pin)) return false;
        
        if (pin >= 400001 && pin <= 400104) return true; // South Mumbai, Western Suburbs, Central & Eastern
        if (pin >= 400601 && pin <= 400615) return true; // Thane, Navi Mumbai (400614)
        if (pin >= 400701 && pin <= 400710) return true; // Navi Mumbai
        if (pin >= 401101 && pin <= 401107) return true; // Mira Road-Bhayandar
        if (pin >= 401201 && pin <= 401209) return true; // Vasai-Nalasopara
        if (pin >= 401301 && pin <= 401305) return true; // Virar
        if (pin === 410206) return true; // Panvel
        if (pin === 410209) return true; // Kamothe
        if (pin === 410210) return true; // Kharghar
        if (pin === 410218) return true; // Kalamboli
        if (pin === 421301) return true; // Kalyan
        if (pin >= 421201 && pin <= 421202) return true; // Dombivli
        if (pin >= 421001 && pin <= 421005) return true; // Ulhasnagar
        if (pin >= 421302 && pin <= 421308) return true; // Bhiwandi
        if (pin === 421501) return true; // Ambernath
        if (pin === 421503) return true; // Badlapur
        
        return false;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let { name, value } = e.target;
        
        setFormData({ ...formData, [name]: value });

        if (name === "zip") {
            if (value.length > 0 && !isValidPincode(value)) {
                setPincodeError("Shipping available only in Mumbai and adjoining areas");
            } else {
                setPincodeError("");
            }
        }
    };



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        let hasError = false;

        if (!isValidPincode(formData.zip)) {
            setPincodeError("Shipping available only in Mumbai and adjoining areas");
            hasError = true;
        }

        if (hasError) return;

        setSubmitting(true);
        try {
            // Create proper order payload
            const orderPayload = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                city: formData.city,
                state: formData.state,
                zip: formData.zip,
                flavor: flavorData.id,
                flavorName: flavorData.name,
                quantity: quantity,
                subtotal: subtotal,
                shipping: shipping,
                paymentMethod: "cod" // Razorpay integration point for future
            };

            const res = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderPayload)
            });

            const data = await res.json();
            
            if (data.success && data.orderId) {
                // Future Razorpay logic goes here:
                // const options = { key: process.env.RAZORPAY_KEY, ... }
                // const rzp = new window.Razorpay(options); rzp.open();
                
                // For now, redirect to success route carrying the real order id forward
                router.push(`/checkout/success?id=${data.orderId}`);
            } else {
                console.error("Failed to create order", data);
                setSubmitting(false);
            }
        } catch (err) {
            console.error("Order error", err);
            setSubmitting(false);
        }
    };

    if (!mounted) return null;

    return (
        <main className="min-h-screen bg-primary-white py-24 md:py-32 font-body relative overflow-hidden text-accent-premium">
            {/* Background elements for aesthetic */}
            <div className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] bg-gray-200/50 -translate-y-1/2 translate-x-1/2 pointer-events-none`} />
            
            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                {/* Header Area */}
                <div className="mb-10 lg:mb-16">
                    <Link href={`/products/${flavorData.id}`} className="inline-flex items-center gap-2 font-heading font-black uppercase tracking-widest text-sm mb-6 hover:opacity-60 transition-opacity bg-white/60 backdrop-blur-md px-5 py-3 rounded-full shadow-sm border border-gray-100">
                        <ArrowLeft className="w-5 h-5" /> Keep Shopping
                    </Link>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black uppercase tracking-tighter">
                        Secure <span className="text-gray-400 font-bold block sm:inline">Checkout</span>
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
                    
                    {/* LEFT COLUMN: Billing & Payment Information */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-7 flex flex-col gap-10"
                    >
                        {/* 1. Contact Information */}
                        <div className="bg-white/80 backdrop-blur-xl p-5 sm:p-8 md:p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 bg-gray-100 rounded-full text-accent-premium">
                                    <span className="font-heading font-black">1</span>
                                </div>
                                <h2 className="text-2xl font-heading font-black uppercase tracking-tight">Contact Details</h2>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <InputField label="First Name" name="firstName" placeholder="John" value={formData.firstName} onChange={handleInputChange} />
                                <InputField label="Last Name" name="lastName" placeholder="Doe" value={formData.lastName} onChange={handleInputChange} />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <InputField label="Email Address" name="email" type="email" placeholder="john@example.com" value={formData.email} onChange={handleInputChange} />
                                <InputField label="Phone Number" name="phone" type="tel" placeholder="+1 (555) 000-0000" value={formData.phone} onChange={handleInputChange} />
                            </div>
                        </div>

                        {/* 2. Shipping Address */}
                        <div className="bg-white/80 backdrop-blur-xl p-5 sm:p-8 md:p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-gray-100">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-gray-100 rounded-full text-accent-premium">
                                        <span className="font-heading font-black">2</span>
                                    </div>
                                    <h2 className="text-2xl font-heading font-black uppercase tracking-tight">Shipping Address</h2>
                                </div>
                                <div className="text-[10px] md:text-xs bg-accent-premium/10 text-accent-premium border border-accent-premium/20 px-3 py-1.5 rounded-full font-bold uppercase tracking-widest hidden min-[400px]:block shrink-0">
                                    Mumbai Only
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-6">
                                <InputField label="Street Address" name="address" placeholder="123 Hydration Blvd, Suite 100" value={formData.address} onChange={handleInputChange} />
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <InputField label="City" name="city" placeholder="Mumbai" value={formData.city} onChange={handleInputChange} readOnly={true} />
                                    <InputField label="State / Province" name="state" placeholder="Maharashtra" value={formData.state} onChange={handleInputChange} readOnly={true} />
                                    <InputField label="Zip Code" name="zip" placeholder="400001" value={formData.zip} onChange={handleInputChange} error={pincodeError} />
                                </div>
                            </div>
                        </div>

                        {/* 3. Payment Information */}
                        <div className="bg-gray-50/80 backdrop-blur-xl p-5 sm:p-8 md:p-10 rounded-[2.5rem] shadow-inner border border-gray-200">
                            <div className="flex justify-between items-center mb-8">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-accent-premium rounded-full text-white">
                                        <CreditCard className="w-5 h-5" />
                                    </div>
                                    <h2 className="text-2xl font-heading font-black uppercase tracking-tight">Payment Method</h2>
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-4">
                                <label className="flex items-center p-5 border-2 border-[#39FF14] bg-[#39FF14]/5 rounded-2xl cursor-pointer transition-all">
                                    <input type="radio" name="payment" defaultChecked className="w-5 h-5 text-[#39FF14] accent-[#39FF14] focus:ring-[#39FF14]" />
                                    <div className="ml-4 flex flex-col">
                                        <span className="font-heading font-black uppercase tracking-widest text-lg">Cash on Delivery</span>
                                        <span className="font-body text-gray-500 text-sm">Pay when you receive your order</span>
                                    </div>
                                </label>
                                
                                <label className="flex items-center p-5 border-2 border-gray-200 bg-gray-50 rounded-2xl cursor-not-allowed opacity-60">
                                    <input type="radio" name="payment" disabled className="w-5 h-5" />
                                    <div className="ml-4 flex flex-col">
                                        <span className="font-heading font-black uppercase tracking-widest text-lg flex gap-2 items-center">
                                            Online Payment 
                                            <span className="bg-gray-200 text-gray-500 rounded text-[10px] px-2 py-0.5">Coming Soon</span>
                                        </span>
                                        <span className="font-body text-gray-400 text-sm">Razorpay integration in progress</span>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </motion.div>

                    {/* RIGHT COLUMN: Order Summary */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="lg:col-span-5"
                    >
                        <div className="sticky top-32 bg-accent-premium text-white p-6 sm:p-8 md:p-10 rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.15)] flex flex-col">
                            
                            <h2 className="text-3xl font-heading font-black uppercase tracking-tighter mb-8 border-b border-white/10 pb-6 flex items-center justify-between">
                                Order Summary
                                <ShoppingBag className="w-6 h-6 opacity-50" />
                            </h2>

                            {/* Cart Items */}
                            <div className="flex items-center gap-6 mb-8 mt-2">
                                {/* Visual product thumbnail */}
                                <div className="w-28 h-32 sm:w-32 sm:h-40 bg-white rounded-2xl flex items-center justify-center border border-gray-100 overflow-hidden relative shadow-[inset_0_2px_15px_rgba(0,0,0,0.05)] shrink-0">
                                    <div className="absolute w-[160%] h-[160%] top-[-10%] pointer-events-none drop-shadow-lg">
                                        <Scene 
                                            labelPath={flavorData.label}
                                            liquidColor={flavorData.liquid}
                                            capColor={flavorData.cap}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col flex-1 pl-2">
                                    <h4 className="font-heading font-black uppercase text-xl leading-tight">{flavorData.name}</h4>
                                    <p className="text-white/60 font-body text-sm mt-1">{quantity}x Pack of 6</p>
                                    <div className="mt-3 font-heading font-black text-lg">₹{subtotal.toFixed(2)}</div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4 font-body border-y border-white/10 py-6 mb-8 text-white/80">
                                <div className="flex justify-between items-center">
                                    <span>Subtotal</span>
                                    <span className="font-bold text-white">₹{subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="flex items-center gap-2">
                                        <Truck className="w-4 h-4" /> Shipping
                                    </span>
                                    <span className="font-bold text-white tracking-widest">₹{shipping.toFixed(2)}</span>
                                </div>
                            </div>

                            {/* Total Area */}
                            <div className="flex justify-between items-end mb-10">
                                <span className="font-heading font-black uppercase text-gray-400 tracking-widest text-sm mb-1">Total</span>
                                <span className="text-4xl lg:text-5xl font-heading font-black tracking-tighter">₹{total}</span>
                            </div>

                            {/* Checkout Button */}
                            <button type="submit" disabled={submitting} className="w-full bg-[#39FF14] text-[#0A0A0A] py-6 rounded-full font-heading font-black uppercase tracking-widest text-lg md:text-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_10px_30px_rgba(57,255,20,0.3)] flex items-center justify-center gap-3 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed">
                                {submitting ? "Processing..." : "Place Order"}
                            </button>

                            <div className="mt-8 flex items-start gap-4 text-white/40 text-xs font-body leading-relaxed justify-center text-center">
                                <ShieldCheck className="w-5 h-5 shrink-0" />
                                <p>Guaranteed safe & secure checkout. By completing your order, you agree to our Terms of Service & Privacy Policy.</p>
                            </div>
                        </div>
                    </motion.div>

                </form>
            </div>
        </main>
    );
}

export default function CheckoutPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-primary-white" />}>
            <CheckoutContent />
        </Suspense>
    );
}
