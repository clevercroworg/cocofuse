"use client";

import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import StorySection from "@/components/StorySection";
import Link from "next/link";

// ——— CONSTANTS & DATA ——————————————————————————————————————

const founders = [
    {
        name: "Miket",
        role: "The Visionary",
        tag: "Mountain Born",
        desc: "A high-altitude climber who realized hydration shouldn't be boring, unhealthy, or sugary. He brings the curiosity, the spark, and the alpine origin idea that defines every bottle.",
        color: "var(--color-accent-basil)", // primary-green
        bg: "bg-primary-green/10",
        border: "border-primary-green/20",
        image: "/founders/miket.jpeg",
        quote: "Hydration is the baseline of adventure."
    },
    {
        name: "Joel",
        role: "The Alchemist",
        tag: "Flavor Heart",
        desc: <>The maestro behind the blend. He refused to let <span className="font-wedges not-italic whitespace-nowrap"><span className="text-primary-green">COCO</span><span className="text-primary-blue">FUSE.</span></span> look, taste, or BE boring. Joel brings the bold experimentation and the jazzy personality to our functional chemistry.</>,
        color: "var(--color-primary-blue)", // primary-blue
        bg: "bg-primary-blue/10",
        border: "border-primary-blue/20",
        image: "/founders/joel.jpeg",
        quote: "Taste is a frequency. We just tuned it."
    },
    {
        name: "Rishit",
        role: "The Architect",
        tag: "The Backbone",
        desc: "If Miket is fire and Joel is electricity, Rishit is gravity. He brings the structure, stability, and scale to turn raw passion into a premium, mountain-born reality.",
        color: "var(--color-accent-mango)", // accent-mango
        bg: "bg-accent-mango/10",
        border: "border-accent-mango/20",
        image: null as string | null,
        quote: "Vision needs a foundation to reach the peak."
    }
];

const DECO_ELEMENTS = [
    { src: "/assets/deco/mango 1.svg", size: "w-20 md:w-32", top: "15%", left: "5%", delay: 0, rotate: 15 },
    { src: "/assets/deco/Watermelon 2.svg", size: "w-16 md:w-24", top: "10%", right: "8%", delay: 0.2, rotate: -20 },
    { src: "/assets/deco/Chili 1.svg", size: "w-12 md:w-20", bottom: "15%", left: "12%", delay: 0.4, rotate: 45 },
    { src: "/assets/deco/leaf 1.svg", size: "w-24 md:w-36", top: "40%", right: "5%", delay: 0.6, rotate: -10 },
    { src: "/assets/deco/mango 2.svg", size: "w-16 md:w-28", bottom: "25%", right: "15%", delay: 0.8, rotate: -30 },
    { src: "/assets/deco/Watermelon 1.svg", size: "w-14 md:w-20", top: "50%", left: "8%", delay: 1, rotate: 25 },
    { src: "/assets/deco/Chili 2.svg", size: "w-10 md:w-16", top: "35%", left: "20%", delay: 1.2, rotate: -15 },
    { src: "/assets/deco/leaf 3.svg", size: "w-20 md:w-32", bottom: "35%", left: "25%", delay: 1.4, rotate: 35 },
];

// ——— COMPONENTS ————————————————————————————————————————————

/**
 * Animated Gradient Background with "Liquid" Orbs
 */
function LiquidBackground() {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {/* Base Light BG */}
            <div className="absolute inset-0 bg-primary-white" />

            {/* Soft, beautifully composed large glows */}
            <motion.div 
                animate={{ x: [0, 30, -30, 0], y: [0, -30, 30, 0] }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute -top-[10%] -left-[10%] w-[80vw] md:w-[50vw] aspect-square bg-primary-green/20 rounded-full blur-[120px]" 
            />
            <motion.div 
                animate={{ x: [0, -40, 40, 0], y: [0, 40, -40, 0] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-[10%] -right-[10%] w-[80vw] md:w-[50vw] aspect-square bg-accent-mango/15 rounded-full blur-[120px]" 
            />
            <motion.div 
                animate={{ x: [0, -20, 20, 0], y: [0, 20, -20, 0] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-[20%] left-[20%] w-[60vw] md:w-[40vw] aspect-square bg-primary-blue/15 rounded-full blur-[140px]" 
            />
            
            {/* Subtle Noise Texture for a premium feel */}
            <div className="absolute inset-0 opacity-[0.03] mix-blend-multiply" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
        </div>
    );
}

/**
 * Split Text reveal for titles
 */
function RevealTitle({ text, className }: { text: string, className?: string }) {
    return (
        <h1 className={`${className} flex flex-wrap max-w-full`}>
            {text.split(" ").map((word, i) => (
                <div key={i} className="inline-block overflow-hidden pb-2 mr-[0.3em] max-w-full">
                    <motion.span
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 + (i * 0.1) }}
                        className="inline-block break-words max-w-full"
                    >
                        {word}
                    </motion.span>
                </div>
            ))}
        </h1>
    );
}

/**
 * Floating decorative elements using SVGs
 */
function FloatingDeco() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10 hidden md:block">
            {DECO_ELEMENTS.map((el, i) => (
                <motion.div
                    key={i}
                    className={`absolute ${el.size} opacity-40`}
                    style={{ top: el.top, left: el.left, right: el.right, bottom: el.bottom }}
                    initial={{ y: 50, opacity: 0, rotate: el.rotate - 20 }}
                    animate={{ y: [0, -15, 0], opacity: 0.4, rotate: [el.rotate, el.rotate + 10, el.rotate] }}
                    transition={{
                        y: { duration: 4 + i, repeat: Infinity, ease: "easeInOut" },
                        rotate: { duration: 6 + i, repeat: Infinity, ease: "easeInOut" },
                        opacity: { duration: 1, delay: el.delay }
                    }}
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={el.src} alt="" className="w-full h-auto drop-shadow-sm" />
                </motion.div>
            ))}
        </div>
    );
}

/**
 * About Hero Section
 */
function AboutHero() {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"]
    });

    const textY = useTransform(scrollYProgress, [0, 1], [0, -60]);

    return (
        <section ref={sectionRef} className="relative min-h-[90dvh] md:min-h-screen flex items-center justify-center overflow-hidden bg-primary-white pt-32 pb-20 border-b-4 border-accent-premium">
            <LiquidBackground />
            <FloatingDeco />
            
            <div className="container mx-auto px-6 relative z-20 flex flex-col items-center justify-center text-center">
                <motion.div style={{ y: textY }} className="flex flex-col items-center w-full max-w-6xl mx-auto">
                    
                    {/* Clean Pill Tag */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
                        className="inline-flex items-center gap-3 px-6 py-2 md:py-3 rounded-full border-2 border-accent-premium bg-white text-accent-premium shadow-[4px_4px_0px_#0A0A0A] mb-10 md:mb-16 hover:-translate-y-1 transition-transform duration-300"
                    >
                        <div className="w-2 md:w-3 h-2 md:h-3 rounded-full bg-accent-watermelon animate-pulse" />
                        <span className="font-heading font-black text-xs md:text-sm tracking-[0.25em] md:tracking-[0.3em] uppercase">
                            The Humans of Fuse
                        </span>
                    </motion.div>
                    
                    {/* Properly Structured Massive Typography */}
                    <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-[8.5rem] leading-[0.95] font-heading font-black uppercase tracking-tighter text-accent-premium flex flex-col items-center w-full drop-shadow-sm">
                        
                        <span className="flex flex-col items-center">
                            <motion.span initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease: "easeOut" }} className="inline-block relative z-10 w-full text-center">
                                THE ARCHITECTS
                            </motion.span>
                        </span>
                        
                        <span className="flex flex-wrap justify-center items-center gap-4 md:gap-8 mt-2 md:mt-4 w-full">
                            <motion.span initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }} className="inline-block text-[12vw] sm:text-[5rem] md:text-[7rem] lg:text-[8.5rem]">
                                OF
                            </motion.span>
                            
                            <motion.span 
                                initial={{ y: 50, opacity: 0, rotate: 0 }} 
                                animate={{ y: 0, opacity: 1, rotate: -2 }} 
                                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }} 
                                className="inline-block px-6 md:px-10 py-2 md:py-3 pb-3 md:pb-5 bg-primary-blue text-white border-4 border-accent-premium shadow-[6px_6px_0px_#0A0A0A] md:shadow-[10px_10px_0px_#0A0A0A] hover:rotate-0 transition-transform duration-300"
                            >
                                <span className="font-wedges not-italic tracking-normal"><span className="text-[#7ED956]">COCO</span><span className="text-white">FUSE.</span></span>
                            </motion.span>
                        </span>
                    </h1>

                    {/* Clean Subtext */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                        className="mt-16 md:mt-24 max-w-3xl mx-auto px-4"
                    >
                        <p className="text-accent-premium/80 font-body font-semibold text-xl md:text-3xl leading-relaxed">
                            We didn't set out to build a brand. We set out to find a better way to hydrate.
                            <br className="hidden md:block" />
                            <span className="text-accent-premium font-black text-2xl md:text-4xl mt-4 md:mt-6 block">
                                <span className="text-primary-green drop-shadow-sm">Met on the trail,</span> stayed for the obsession.
                            </span>
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

/**
 * Magazine Style Founder Feature
 */
function FounderCard({ founder, index }: { founder: typeof founders[0], index: number }) {
    const containerRef = useRef(null);
    const isEven = index % 2 === 0;

    // Compact card for founders without a photo
    if (!founder.image) {
        return (
            <motion.div
                ref={containerRef}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="mb-32 md:mb-56 max-w-4xl mx-auto"
            >
                <div className="relative p-8 md:p-12 rounded-[3rem] bg-white border-4 border-accent-premium shadow-[8px_8px_0px_#0A0A0A] overflow-hidden">
                    {/* Background glow */}
                    <div className="absolute top-0 right-0 w-64 h-64 opacity-15 pointer-events-none" style={{ background: `radial-gradient(circle at center, ${founder.color}, transparent 70%)` }} />

                    <div className="flex flex-col md:flex-row items-start gap-8 md:gap-12 relative z-10">
                        {/* Small initial badge */}
                        <div className="shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-2xl border-4 border-accent-premium flex items-center justify-center relative overflow-hidden" style={{ background: `linear-gradient(135deg, #FFA726 0%, #FF7043 50%, #F4511E 100%)`, boxShadow: `4px 4px 0px ${founder.color}` }}>
                            <span className="text-5xl md:text-7xl font-heading font-black text-white/90 leading-none select-none drop-shadow-md">
                                {founder.name.charAt(0)}
                            </span>
                        </div>

                        {/* Text content */}
                        <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-4 mb-2">
                                <h2 className="text-4xl md:text-6xl font-heading font-black uppercase text-accent-premium tracking-tighter">
                                    {founder.name}
                                </h2>
                                <span className="px-4 py-1.5 bg-white border-2 border-accent-premium shadow-[2px_2px_0px_#0A0A0A] rounded-full text-[10px] font-heading font-black text-accent-premium uppercase tracking-widest">
                                    {founder.tag}
                                </span>
                            </div>
                            <h3 className="text-lg md:text-xl font-heading font-black uppercase tracking-widest mb-6" style={{ color: founder.color, textShadow: "1px 1px 0px rgba(17,17,17,0.2)" }}>
                                {founder.role}
                            </h3>

                            <div className="w-10 h-1.5 border-2 border-accent-premium mb-6" style={{ backgroundColor: founder.color }} />

                            <p className="text-base md:text-lg font-body font-bold text-accent-premium/70 leading-relaxed max-w-xl mb-8">
                                {founder.desc}
                            </p>

                            <div className="relative p-6 rounded-2xl bg-[#F7F7F7] border-2 border-accent-premium/10 max-w-md">
                                <p className="text-base md:text-lg font-body font-bold text-accent-premium leading-snug">
                                    &ldquo;{founder.quote}&rdquo;
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        );
    }

    // Full magazine layout for founders with photos
    return (
        <motion.div 
            ref={containerRef}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-24 mb-32 md:mb-56`}
        >
            {/* Image Side */}
            <div className="relative w-full md:w-1/2 aspect-[4/5] md:aspect-[3/4]">
                <div className="absolute inset-0 overflow-hidden rounded-[3rem] bg-white border-4 border-accent-premium shadow-[8px_8px_0px_#0A0A0A] group">
                    <motion.div
                        whileInView={{ scale: [1.2, 1] }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="w-full h-full relative"
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img 
                            src={founder.image} 
                            alt={founder.name} 
                            className="w-full h-full object-cover transition-all duration-1000"
                        />
                    </motion.div>
                    
                    {/* Glassy Tag */}
                    <div className="absolute top-8 left-8 p-1.5 px-4 bg-white border-2 border-accent-premium shadow-[2px_2px_0px_#0A0A0A] rounded-full">
                        <span className="text-[10px] font-heading font-black text-accent-premium uppercase tracking-widest">{founder.tag}</span>
                    </div>

                    {/* Corner Accent */}
                    <div className={`absolute bottom-0 ${isEven ? 'left-0' : 'right-0'} w-32 h-32 opacity-20`} 
                         style={{ background: `radial-gradient(circle at center, ${founder.color}, transparent 70%)` }} 
                    />
                </div>
                
                {/* Floating Background Text */}
                <span className={`absolute ${isEven ? '-left-8 md:-left-20' : '-right-8 md:-right-20'} top-1/2 -translate-y-1/2 text-[20vw] font-heading font-black opacity-[0.03] text-accent-premium pointer-events-none select-none uppercase -rotate-90`}>
                    {founder.name}
                </span>
            </div>

            {/* Content Side */}
            <div className="w-full md:w-1/2 flex flex-col items-start">
                <motion.div
                    initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    <h2 className="text-6xl md:text-8xl lg:text-9xl font-heading font-black uppercase text-accent-premium tracking-tighter mb-4">
                        {founder.name}
                    </h2>
                    <h3 className="text-xl md:text-2xl font-heading font-black uppercase tracking-widest mb-8" style={{ color: founder.color, textShadow: "1px 1px 0px rgba(17,17,17,0.2)" }}>
                        {founder.role}
                    </h3>
                    
                    <div className="w-12 h-2 border-2 border-accent-premium mb-8" style={{ backgroundColor: founder.color }} />
                    
                    <p className="text-lg md:text-2xl font-body font-bold text-accent-premium/70 leading-relaxed max-w-lg mb-12">
                        {founder.desc}
                    </p>

                    <div className="relative p-8 rounded-[2rem] bg-white border-4 border-accent-premium" style={{ boxShadow: `6px 6px 0px ${founder.color}` }}>
                        <p className="text-lg md:text-xl font-body font-bold text-accent-premium leading-snug">
                            &ldquo;{founder.quote}&rdquo;
                        </p>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}

// ——— MAIN PAGE ————————————————————————————————————————

export default function AboutPage() {
    return (
        <main className="min-h-screen font-body bg-primary-white selection:bg-primary-green selection:text-accent-premium text-accent-premium">
            <Navbar />
            
            <AboutHero />

            <StorySection />

            {/* ——— CONTENT START ——— */}
            <section className="relative pt-24 md:pt-32 pb-12 md:pb-16 z-20 bg-[#F3F3F1]">
                <div className="container mx-auto px-6 md:px-12">
                    
                    {/* Section Header */}
                    <div className="mb-24 md:mb-32 flex flex-col items-center text-center gap-6">
                        <motion.span
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="inline-block px-5 py-2 rounded-full border-2 border-[#111111] bg-white text-[#111111] shadow-[4px_4px_0px_#111111] font-heading font-black text-[10px] md:text-sm tracking-[0.4em] uppercase"
                        >
                            Meet The Founders
                        </motion.span>
                        <motion.h2 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-5xl sm:text-6xl md:text-8xl lg:text-[8rem] font-heading font-black uppercase text-[#111111] tracking-tighter leading-[0.85] drop-shadow-sm"
                        >
                            THE FUSE <br />
                            <span className="text-primary-green">COLLECTIVE</span>
                        </motion.h2>
                        <motion.p 
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-[#111111]/60 font-bold font-body text-lg md:text-xl max-w-lg leading-relaxed"
                        >
                            Three distinct disciplines, one shared quest for the ultimate peak state.
                        </motion.p>
                        <div className="w-20 md:w-32 h-2 md:h-3 bg-primary-green rounded-full shadow-lg mt-2" />
                    </div>

                    {/* Founders List */}
                    {founders.map((founder, i) => (
                        <FounderCard key={founder.name} founder={founder} index={i} />
                    ))}

                    {/* Closing Section */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="mt-24 md:mt-48 py-24 md:py-32 rounded-[4rem] bg-white border-4 border-accent-premium shadow-[12px_12px_0px_#0A0A0A] text-center relative overflow-hidden"
                    >
                        {/* Glow */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-full bg-primary-green/20 blur-[150px] opacity-60" />
                        
                        <div className="relative z-10">
                            <span className="text-xs md:text-sm font-heading font-black text-accent-premium/50 uppercase tracking-[0.5em] mb-8 inline-block">THE FINAL EQUATION</span>
                            <h3 className="text-5xl md:text-7xl lg:text-[7rem] font-heading font-black text-accent-premium uppercase tracking-tighter leading-none flex flex-col gap-4">
                                <span className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
                                    VISION <span className="text-primary-green">+</span> VIBE
                                </span>
                                <span className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
                                    BALANCE <span className="text-primary-green">=</span> <span className="font-wedges not-italic tracking-normal pr-2"><span className="text-[#7ED956]">COCO</span><span className="text-[#3AB6FD]">FUSE.</span></span>
                                </span>
                            </h3>
                            
                            <Link href="/#flavours" passHref legacyBehavior>
                                <motion.a
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="mt-16 inline-block px-12 py-5 bg-accent-basil text-accent-premium border-4 border-accent-premium shadow-[6px_6px_0px_#0A0A0A] rounded-full font-heading font-black uppercase tracking-widest text-sm transition-all hover:-translate-y-1 hover:shadow-[8px_8px_0px_#0A0A0A] cursor-pointer"
                                >
                                    Shop the Fuse
                                </motion.a>
                            </Link>
                        </div>
                    </motion.div>

                </div>
            </section>

            <Footer />
        </main>
    );
}
