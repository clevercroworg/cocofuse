"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { useFlavor, FLAVORS, FlavorID } from "@/context/FlavorContext";
import { ShoppingBag, ArrowRight } from "lucide-react";
import HeroDeco from "./HeroDeco";
import dynamic from "next/dynamic";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

function MiniFruitIcon({ iconUrl, active, onClick, name, hideLabel = false }: { iconUrl: string, active: boolean, onClick: () => void, name: string, hideLabel?: boolean }) {
    return (
        <button 
            type="button"
            onClick={onClick}
            className={`relative z-10 flex flex-col items-center gap-2 group transition-all duration-500 scale-75 sm:scale-100 ${active ? 'scale-100 sm:scale-110 opacity-100' : 'opacity-60 hover:opacity-100 hover:scale-95 sm:hover:scale-105'}`}
        >
            <div 
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-xl border-2 flex flex-col items-center justify-center overflow-hidden transition-all duration-700 relative backdrop-blur-md ${active ? 'border-white bg-white/20' : 'border-white/10 bg-black/10 group-hover:border-white/40 group-hover:bg-white/5'}`}
            >
                <img src={iconUrl} alt={name} className="w-10 h-10 object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:scale-110" />
            </div>
            {!hideLabel && (
                <span className={`text-[9px] sm:text-[10px] font-heading font-black uppercase tracking-widest absolute -bottom-5 sm:-bottom-6 whitespace-nowrap transition-all duration-300 ${active ? 'opacity-100 text-white drop-shadow-md' : 'opacity-0 group-hover:opacity-100 text-white/70'}`}>
                    {name}
                </span>
            )}
        </button>
    );
}

export default function Hero() {
    const { flavorData, setFlavor } = useFlavor();
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMobileSelectorOpen, setIsMobileSelectorOpen] = useState(false);

    const [vh, setVh] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const checkMobileAndHeight = () => {
            const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
            const isNarrow = window.innerWidth < 1024;
            setIsMobile(isNarrow || isTouch);
            setVh(window.innerHeight);
        };
        checkMobileAndHeight();
        window.addEventListener("resize", checkMobileAndHeight);
        return () => window.removeEventListener("resize", checkMobileAndHeight);
    }, []);

    const { scrollY, scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Parallax logic for 200vh sticky section
    const textYDesktop = useTransform(scrollYProgress, [0, 1], ["0%", "-150%"]);
    const textYMobile = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
    const textY = isMobile ? textYMobile : textYDesktop;
    
    // Main text and deco block visuals
    const textOpacity = useTransform(scrollYProgress, [0, 0.8, 0.95], [1, 1, 0]);
    
    // FAB & Dock Opacity Control (Vanish abruptly on mobile scrolling to prevent bleed)
    const fabOpacityDesktop = useTransform(scrollYProgress, [0, 0.8, 0.95], [1, 1, 0]);
    const fabOpacityMobile = useTransform(scrollYProgress, [0, 0.02, 0.15], [1, 1, 0]);
    const fabOpacity = isMobile ? fabOpacityMobile : fabOpacityDesktop;

    // Interaction toggle so invisible buttons don't trap layout taps
    const btnEventDesktop = useTransform(scrollYProgress, [0, 0.8, 0.95], ["auto", "auto", "none"]);
    const btnEventMobile = useTransform(scrollYProgress, [0, 0.02, 0.15], ["auto", "auto", "none"]);
    const pointerEventsControls = isMobile ? btnEventMobile : btnEventDesktop;

    // CTA Reveal Logic for Desktop (Hidden at top, appears on scroll)
    const ctaOpacityDesktop = useTransform(scrollYProgress, [0, 0.08], [0, 1]);
    const ctaYDesktop = useTransform(scrollYProgress, [0, 0.08], [40, 0]);

    // Pill collapse logic
    const pillOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
    const pillY = useTransform(scrollYProgress, [0, 0.05], [0, -20]);
    const pillPointerEvents = useTransform(scrollYProgress, [0, 0.05], ["auto", "none"]);

    // Marquee scrolling
    const marqueeX1 = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
    const marqueeX2 = useTransform(scrollYProgress, [0, 1], ["-50%", "0%"]);

    // Mobile sequential scroll reveals (raw scrollY pixel values)
    // Only the description box is hidden initially and reveals on scroll
    const mobileDescOpacity = useTransform(scrollY, [80, 180], [0, 1]);
    const mobileDescY = useTransform(scrollY, [80, 180], [40, 0]);

    const palettes = {
        mango: {
            bg: "bg-festival-gradient-1",
            marquee1: "text-black",
            marquee2Stroke: "white",
            pillBg: "bg-accent-premium",
            pillDot: "bg-primary-green",
            pillText: "text-primary-white",
            pillBorder: "border-primary-premium",
            head1: "text-accent-premium",
            head2: "text-accent-premium",
            head3: "text-accent-premium",
            btnBg: "bg-accent-premium",
            btnText: "text-primary-white",
            descText: "text-accent-premium",
            descAccent: "text-primary-blue"
        },
        watermelon: {
            bg: "bg-watermelon-gradient",
            marquee1: "text-[#FAFAFA]",
            marquee2Stroke: "#0A0A0A",
            pillBg: "bg-[#E8314A]",
            pillDot: "bg-[#FFD166]",
            pillText: "text-[#FAFAFA]",
            pillBorder: "border-[#E8314A]",
            head1: "text-[#E8314A]",
            head2: "text-[#0A0A0A]",
            head3: "text-[#FAFAFA]",
            btnBg: "bg-[#E8314A]",
            btnText: "text-[#FAFAFA]",
            descText: "text-white",
            descAccent: "text-[#FFD166]"
        },
        basil: {
            bg: "bg-basil-gradient",
            marquee1: "text-[#0A0A0A]",
            marquee2Stroke: "#FAFAFA",
            pillBg: "bg-[#39FF14]",
            pillDot: "bg-[#FAFAFA]",
            pillText: "text-[#111111]",
            pillBorder: "border-[#39FF14]",
            head1: "text-[#FAFAFA]",
            head2: "text-[#0A0A0A]",
            head3: "text-[#39FF14]",
            btnBg: "bg-[#39FF14]",
            btnText: "text-[#111111]",
            descText: "text-[#0A0A0A]",
            descAccent: "text-[#7ED956]"
        }
    };
    const p = palettes[flavorData.id];

    return (
        <section
            ref={containerRef}
            className={`relative w-full min-h-[100dvh] lg:h-[200vh] ${p.bg} transition-colors duration-1000 z-20 flex flex-col lg:block`}
        >
            <div className="lg:sticky top-0 min-h-[100dvh] lg:min-h-[600px] lg:h-[100dvh] w-full lg:overflow-hidden flex flex-col justify-start lg:justify-center pb-6 lg:pb-0">

                {/* Parallax Background Gradient Blobs - Removed for cleaner look */}
                {/* <div className="absolute inset-0 pointer-events-none overflow-hidden mix-blend-color-burn">
                    <motion.div
                        animate={{
                            rotate: 360,
                            scale: [1, 1.2, 1],
                        }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-festival-gradient-2 rounded-full blur-[100px] opacity-70"
                    />
                    <motion.div
                        animate={{
                            rotate: -360,
                            scale: [1, 1.5, 1],
                        }}
                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                        className="absolute bottom-[-20%] right-[-10%] w-[70vw] h-[70vw] bg-festival-gradient-3 rounded-[40%] blur-[120px] opacity-80"
                    />
                </div> */}

                {/* Background Kinetic Typography Marquees Removed */}

                {/* HERO DECORATIONS */}
                <HeroDeco key={flavorData.id} flavorId={flavorData.id} opacity={textOpacity} />

                {/* 3D Can Layer - MOBILE ONLY -> Moved to MIDDLE STACK below */}

                {/* Main Text Content */}
                <motion.div
                    style={isMobile ? undefined : { y: textY, opacity: textOpacity, willChange: "transform, opacity" }}
                    className="container mx-auto px-5 md:px-6 lg:px-12 relative z-20 w-full flex-grow lg:flex-grow-0 lg:h-[100dvh] lg:min-h-[600px] pt-[100px] min-[375px]:pt-[110px] min-[400px]:pt-[115px] pb-4 min-[400px]:pb-[24px] lg:pt-[20vh] lg:pb-[10vh] flex flex-col justify-start lg:justify-start pointer-events-none"
                >
                    <div className="w-full h-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left pointer-events-auto justify-start gap-3 lg:justify-start lg:gap-2">

                        {/* 1. TOP STACK: Status Pill & Headline */}
                        <div className="flex flex-col w-full pointer-events-auto text-center lg:text-left">

                            {/* Status Pill - Vibrant Edition */}
                            <motion.div style={{ opacity: pillOpacity, y: pillY, pointerEvents: pillPointerEvents as any }}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20, scale: 0.9, rotate: -3 }}
                                    animate={{ opacity: 1, y: 0, scale: 1, rotate: -3 }}
                                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                    className={`inline-flex items-center self-center lg:self-start gap-2 px-4 py-1.5 min-[400px]:px-5 min-[400px]:py-2 rounded-full border-4 border-[#111111] bg-white shadow-[6px_6px_0px_#111111] mb-6 md:mb-10 shrink-0 transform -rotate-3 hover:scale-105 hover:rotate-0 transition-all select-none`}
                                >
                                    <span className="relative flex h-2.5 w-2.5 min-[400px]:h-3 min-[400px]:w-3">
                                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${p.pillDot} opacity-75`}></span>
                                        <span className={`relative inline-flex rounded-full h-2.5 w-2.5 min-[400px]:h-3 min-[400px]:w-3 ${p.pillDot}`}></span>
                                    </span>
                                    <span className={`font-heading font-black italic text-xs min-[400px]:text-sm tracking-[0.2em] text-[#111111] uppercase mt-[2px]`}>Now Available</span>
                                </motion.div>
                            </motion.div>

                            {/* Kinetic Headline — always visible on mobile */}
                            <div className="flex flex-col mb-1 min-[400px]:mb-3 md:mb-8 w-full drop-shadow-2xl mt-1 text-center lg:text-left items-center lg:items-start">
                                {[
                                    { text: "Upgrade", delay: 0.1, color: p.head1 },
                                    { text: "The", delay: 0.2, color: p.head2 },
                                    { text: "Drink.", delay: 0.3, color: p.head3 }
                                ].map((line, i) => (
                                    <div key={i} className="relative flex w-full justify-center lg:justify-start py-1 lg:py-2">
                                        <motion.h1
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.8, delay: line.delay, ease: [0.22, 1, 0.36, 1] }}
                                            className={`text-[12vw] sm:text-[4rem] md:text-[5.5rem] lg:text-[7rem] font-heading font-black italic uppercase tracking-tighter leading-[0.9] transition-colors duration-1000 ${line.color}`}
                                        >
                                            {line.text}
                                        </motion.h1>
                                    </div>
                                ))}
                            </div>

                            {/* Hero CTA Button */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                className="mt-2 md:mt-4 w-full md:flex justify-center lg:justify-start hidden"
                            >
                                <button onClick={() => { window.location.href = `/products/${flavorData.id}`; }} className={`px-10 py-3 md:py-4 ${p.btnBg} ${p.btnText} font-heading font-black italic uppercase tracking-widest text-base md:text-xl rounded-full border-4 border-[#111111] shadow-[4px_4px_0px_#111111] md:shadow-[6px_6px_0px_#111111] hover:-translate-y-1 hover:shadow-[6px_6px_0px_#111111] md:hover:shadow-[8px_8px_0px_#111111] transition-all flex items-center justify-center gap-2 group cursor-pointer`}>
                                    <ShoppingBag size={20} className="group-hover:-rotate-12 transition-transform md:w-6 md:h-6" />
                                    <span>Buy Now</span>
                                </button>
                            </motion.div>
                        </div>

                        {/* 2. MIDDLE STACK: The "Can Stage" — always visible on mobile */}
                        <div className="w-full lg:hidden flex-1 min-h-[40vh] md:min-h-[50vh] flex items-center justify-center pointer-events-none z-10">
                            {isMobile && vh > 0 && (
                                <div className="w-[45vw] h-[90vw] max-w-[200px] max-h-[400px]">
                                    <Scene 
                                        scrollY={scrollY}
                                        vh={vh} 
                                        labelPath={flavorData.label}
                                        liquidColor={flavorData.liquid}
                                        capColor={flavorData.cap}
                                    />
                                </div>
                            )}
                        </div>

                        {/* 3. BOTTOM STACK: Subheading & CTAs (Desktop - Appears on Scroll) */}
                        <motion.div
                            style={{ opacity: ctaOpacityDesktop, y: ctaYDesktop }}
                            className="w-full pointer-events-auto text-left hidden lg:flex flex-col"
                        >
                            {/* Subheading */}
                            {/* Subheading - Neo Pop Bubbly Version */}
                            <div className={`mt-4 lg:mt-6 p-6 px-7 bg-white/95 backdrop-blur-md border-4 border-[#111111] shadow-[8px_8px_0px_#111111] rounded-3xl max-w-sm lg:max-w-md transform rotate-1 transition-all duration-300 ml-4 lg:ml-0`}>
                                <p className="font-heading font-black italic text-[#111111] text-2xl lg:text-3xl uppercase tracking-tighter leading-[0.9] drop-shadow-sm">
                                    Next level hydration.<br/>Unreal flavor.<br/>Zero compromise.
                                </p>
                                <p className={`mt-4 font-heading font-bold italic text-[#333333] text-lg lg:text-xl uppercase tracking-wider drop-shadow-sm leading-tight bg-[#F7F7F7] px-4 py-3 rounded-2xl border-2 border-[#111111]/10`}>
                                    <span className="font-wedges not-italic whitespace-nowrap"><span className="text-[#7ED956]">COCO</span><span className="text-[#3AB6FD]">FUSE.</span></span> is a guilt-free fun drink that happens to hydrate.
                                </p>
                                <div className="flex gap-3 mt-5 flex-wrap">
                                    <span className="bg-[#111111] text-white text-xs lg:text-sm font-heading font-black italic uppercase px-4 py-1.5 rounded-full whitespace-nowrap shadow-[3px_3px_0px_#7ED956]">Zero Sugar ⚡</span>
                                    <span className="bg-[#111111] text-white text-xs lg:text-sm font-heading font-black italic uppercase px-4 py-1.5 rounded-full whitespace-nowrap shadow-[3px_3px_0px_#3AB6FD]">Pure Hydration 💧</span>
                                </div>
                            </div>
                            {/* Redundant Desktop CTAs Removed */}
                        </motion.div>

                        {/* 3. BOTTOM STACK: Description (Mobile — scroll-reveal) */}
                        <motion.div
                            style={isMobile ? { opacity: mobileDescOpacity, y: mobileDescY } : undefined}
                            className="flex flex-col w-full pointer-events-auto text-center lg:hidden items-center justify-end pb-8"
                        >
                            <div className={`mt-0 mb-6 p-5 bg-white/95 backdrop-blur-md border-[3px] border-[#111111] shadow-[6px_6px_0px_#111111] rounded-[2rem] max-w-[85vw] mx-auto transform -rotate-1 transition-all duration-300 text-left`}>
                                <p className="font-heading font-black italic text-[#111111] text-xl min-[400px]:text-2xl uppercase tracking-tighter leading-[0.9] drop-shadow-sm">
                                    Next level hydration.<br/>Unreal flavor.<br/>Zero compromise.
                                </p>
                                <p className={`mt-3 font-heading font-bold italic text-[#333333] text-sm min-[400px]:text-base uppercase tracking-wider drop-shadow-sm leading-tight bg-[#F7F7F7] px-3 py-2 rounded-xl border-2 border-[#111111]/10`}>
                                    A guilt-free fun drink that happens to hydrate.
                                </p>
                                <div className="flex gap-2 mt-4 flex-wrap">
                                    <span className="bg-[#111111] text-white text-[10px] min-[400px]:text-xs font-heading font-black italic uppercase px-3 py-1 rounded-full whitespace-nowrap shadow-[2px_2px_0px_#CC0000]">Zero Sugar ⚡</span>
                                    <span className="bg-[#111111] text-white text-[10px] min-[400px]:text-xs font-heading font-black italic uppercase px-3 py-1 rounded-full whitespace-nowrap shadow-[2px_2px_0px_#3AB6FD]">Pure Hydration 💧</span>
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </motion.div>

                {/* Vertical Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                    className="absolute bottom-6 left-6 lg:bottom-12 lg:left-12 z-30 flex flex-col items-center gap-2 min-[400px]:gap-3 mix-blend-difference xl:mix-blend-normal pointer-events-none"
                >
                    <span className="text-[10px] font-heading font-black uppercase tracking-[0.2em] text-accent-premium/50 [writing-mode:vertical-lr] rotate-180">Scroll</span>
                    <div className="w-[1px] h-12 bg-accent-premium/20 overflow-hidden">
                        <motion.div
                            animate={{ y: ["-100%", "100%"] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                            className="w-full h-1/2 bg-accent-premium"
                        />
                    </div>
                </motion.div>
            </div >

            {/* DYNAMIC FIXED LAYER FOR SELECTORS */}
            <motion.div style={{ opacity: fabOpacity }} className="fixed inset-0 z-[100] pointer-events-none">
                {/* DESKTOP FLAVOR SELECTOR DOCK (Bottom Center) */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    style={{ pointerEvents: pointerEventsControls as any }}
                    className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-3 mix-blend-difference xl:mix-blend-normal"
                >
                    <span className="text-[10px] sm:text-xs font-heading font-black uppercase tracking-[0.2em] text-white/50">Fuse Flavor</span>
                    <div className="flex gap-2 sm:gap-4 bg-black/20 backdrop-blur-md p-3 sm:p-4 rounded-3xl border border-white/10 shadow-2xl">
                        {(Object.keys(FLAVORS) as FlavorID[]).map((flavorKey) => (
                            <MiniFruitIcon 
                                key={flavorKey}
                                name={FLAVORS[flavorKey].name.split(" ")[0]}
                                iconUrl={FLAVORS[flavorKey].icon}
                                active={flavorData.id === flavorKey}
                                onClick={() => setFlavor(flavorKey)}
                            />
                        ))}
                    </div>
                </motion.div>

                {/* MOBILE FLAVOR SELECTOR FAB (Bottom Right) */}
                <motion.div style={{ pointerEvents: pointerEventsControls as any }} className="lg:hidden absolute bottom-6 right-6 flex flex-col items-end gap-4">
                    {/* Expanding Options */}
                    <motion.div 
                        initial={false}
                        animate={{ 
                            opacity: isMobileSelectorOpen ? 1 : 0, 
                            y: isMobileSelectorOpen ? 0 : 20, 
                            scale: isMobileSelectorOpen ? 1 : 0.8, 
                            pointerEvents: isMobileSelectorOpen ? 'auto' : 'none' 
                        }}
                        className="flex flex-col gap-4 items-end origin-bottom"
                    >
                        {(Object.keys(FLAVORS) as FlavorID[]).map((flavorKey) => (
                            <div key={flavorKey} className="flex relative items-center justify-end w-full group z-[110]">
                                {/* Native Speed Dial Label */}
                                <span className={`absolute right-full mr-4 z-[120] whitespace-nowrap bg-black/60 backdrop-blur-md text-white text-[10px] sm:text-xs font-heading font-bold uppercase tracking-widest px-4 py-2 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-white/10 transition-all duration-300 ${flavorData.id === flavorKey ? 'opacity-100 scale-100 border-white/30' : 'opacity-80 scale-95'}`}>
                                    {FLAVORS[flavorKey].name}
                                </span>
                                {/* The Fruit Icon Container */}
                                <div 
                                    className={`relative z-[110] bg-black/40 backdrop-blur-xl p-3 rounded-full border transition-all duration-300 shadow-2xl flex items-center justify-center cursor-pointer ${flavorData.id === flavorKey ? 'border-white/50 bg-white/10 scale-110' : 'border-white/10 active:scale-95'}`}
                                    onClick={() => {
                                        setFlavor(flavorKey);
                                        setIsMobileSelectorOpen(false);
                                    }}
                                >
                                    <img 
                                        src={FLAVORS[flavorKey].icon} 
                                        alt={FLAVORS[flavorKey].name}
                                        className="w-8 h-8 object-contain drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]"
                                    />
                                </div>
                            </div>
                        ))}
                    </motion.div>
                    
                    {/* The Main Dot / FAB */}
                    <button 
                        onClick={() => setIsMobileSelectorOpen(!isMobileSelectorOpen)}
                        className="w-20 h-20 sm:w-24 sm:h-24 transition-transform active:scale-95 hover:scale-105 relative z-50 focus:outline-none flex items-center justify-center group"
                    >
                        {isMobileSelectorOpen ? (
                            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black shadow-[0_10px_40px_rgba(0,0,0,0.5)] border border-white/20 flex items-center justify-center">
                                <span className="text-white font-body text-4xl font-light mb-1">&times;</span>
                            </div>
                        ) : (
                            <div className="relative w-full h-full flex items-center justify-center">
                                <img src="/1.svg" alt="Fuse Flavor" className="w-full h-full object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.3)] group-hover:drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)] transition-all duration-300" />
                                <div className="absolute -top-4 sm:-top-6 right-0 bg-[#39FF14] text-black text-[10px] sm:text-xs font-heading font-black px-3 py-1.5 rounded-2xl rounded-br-sm border-2 border-black shadow-[2px_2px_0px_#000] uppercase tracking-wider whitespace-nowrap z-10 animate-bounce pointer-events-none">
                                    Explore your Fuse
                                </div>
                            </div>
                        )}
                    </button>
                </motion.div>
            </motion.div>

        </section >
    );
}
