"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows, OrbitControls } from "@react-three/drei";
import Bottle from "./Bottle";
import Link from "next/link";

const FLAVORS = [
    {
        id: "watermelon",
        name: "Watermelon Mint Reset",
        label: "/assets/watermelon_label_extracted.png",
        liquid: "#E8314A",
        cap: "#111111",
        bg: "bg-[#E8314A]",
        accent: "text-[#FFFFFF]",
        sub: "Fuse of Coconut, Watermelon and Mint",
        stickers: ["RECHARGE 💦", "PURE HYDRATION 💧"],
        btnBg: "bg-[#111111]"
    },
    {
        id: "mango",
        name: "Mango Refresh",
        label: "/assets/label_full.png",
        liquid: "#FFD166",
        cap: "#111111",
        bg: "bg-[#FFD166]",
        accent: "text-[#111111]",
        sub: "Fuse of Coconut and Mango",
        stickers: ["ZERO SUGAR ⚡", "100% NATURAL 🥥"],
        btnBg: "bg-[#111111]"
    },
    {
        id: "basil",
        name: "Basil Chili Revive",
        label: "/assets/chili_label_extracted.png",
        liquid: "#39FF14",
        cap: "#111111",
        bg: "bg-[#39FF14]",
        accent: "text-[#111111]",
        sub: "Fuse of Coconut, Basil and Chili",
        stickers: ["SPICY KICK 🔥", "STAY HYDRATED 💧"],
        btnBg: "bg-[#111111]"
    }
];

function FlavorCard({ flavor, isMobile }: { flavor: typeof FLAVORS[0]; isMobile: boolean }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(cardRef, { margin: "200px" });

    return (
        <motion.div 
            ref={cardRef}
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            className={`w-[85vw] sm:w-[380px] flex-shrink-0 snap-center h-[65vh] min-h-[400px] md:h-[600px] max-h-[550px] md:max-h-[600px] rounded-[2.5rem] md:rounded-[3rem] ${flavor.bg} p-4 md:p-8 flex flex-col items-center justify-between border-4 border-[#111111] shadow-[8px_8px_0px_#111111] relative overflow-visible group select-none`}
        >
            {/* Playful Stickers (Neo-Pop Vibe) */}
            <div className="absolute -top-3 md:top-4 left-[-5px] md:left-[-25px] transform -rotate-12 bg-white border-[3px] md:border-4 border-[#111111] shadow-[4px_4px_0px_#111111] px-3 md:px-4 py-1.5 md:py-2 rounded-full z-20 pointer-events-none">
                <span className="font-heading font-black italic text-[9px] md:text-sm uppercase whitespace-nowrap">{flavor.stickers[0]}</span>
            </div>
            <div className="absolute bottom-[20%] right-[-15px] md:right-[-25px] transform rotate-6 bg-white border-4 border-[#111111] shadow-[4px_4px_0px_#111111] px-4 py-2 rounded-full z-20 pointer-events-none">
                <span className="font-heading font-black italic text-[10px] md:text-sm uppercase whitespace-nowrap">{flavor.stickers[1]}</span>
            </div>

            <div className="text-center z-10 shrink-0 mt-8 md:mt-8 w-full">
                <h3 className={`text-[9vw] sm:text-4xl md:text-5xl font-heading font-black italic uppercase tracking-tighter leading-[0.9] ${flavor.accent} drop-shadow-sm`}>
                    {flavor.name}
                </h3>
                <div className="mt-3">
                    <p className="inline-block text-xs md:text-sm font-heading font-black italic text-black uppercase tracking-widest bg-white/70 px-4 py-1.5 rounded-full border-2 border-black/30">
                        {flavor.sub}
                    </p>
                </div>
            </div>

            <div className={`flex-1 w-full min-h-[220px] sm:min-h-[250px] md:min-h-[300px] relative z-10 ${isMobile ? 'pointer-events-none' : ''}`}>
                <Canvas 
                    frameloop={isMobile ? "demand" : (isInView ? "always" : "never")}
                    camera={{ position: [0, 0, 7.5], fov: 45 }} 
                    gl={{ 
                        antialias: true, 
                        alpha: true,
                        powerPreference: "high-performance"
                    }}
                    dpr={[1, 2]}
                    style={{ touchAction: "pan-y" }}
                    eventSource={isMobile ? undefined : undefined}
                >
                    <ambientLight intensity={1.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />
                    {!isMobile && <pointLight position={[-10, -10, -10]} intensity={1} />}
                    
                    <Bottle 
                        labelPath={flavor.label} 
                        liquidColor={flavor.liquid} 
                        capColor={flavor.cap}
                        scaleMultiplier={isMobile ? 0.65 : 1}
                    />
                    
                    {!isMobile && (
                        <OrbitControls 
                            enableZoom={false} 
                            enablePan={false}
                            enableRotate={false}
                            autoRotate={false}
                            minPolarAngle={Math.PI / 2.2} 
                            maxPolarAngle={Math.PI / 2.2}
                            minAzimuthAngle={0}
                            maxAzimuthAngle={0}
                        />
                    )}
                    {!isMobile && <ContactShadows position={[0, -3.5, 0]} opacity={0.6} scale={12} blur={2.5} far={4.5} />}
                    <Environment files="/hdr/potsdamer_platz_1k.hdr" />
                </Canvas>
            </div>

            <motion.a
                href={`/products/${flavor.id}`}
                whileHover={{ scale: 1.05, rotate: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => { e.preventDefault(); window.location.href = `/products/${flavor.id}`; }}
                className={`z-20 w-[90%] md:w-[80%] ${flavor.btnBg} text-white font-heading text-xl md:text-2xl font-black italic uppercase tracking-wider py-4 rounded-full border-4 border-[#111111] shadow-[6px_6px_0px_#111111] active:shadow-[0px_0px_0px_#111111] active:translate-y-[6px] active:translate-x-[6px] transition-all text-center cursor-pointer no-underline mt-4 block`}
            >
                Grab It!
            </motion.a>
        </motion.div>
    );
}

export default function FlavorShowcase() {
    const targetRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });
    
    const x = useTransform(scrollYProgress, [0, 1], ["0vw", "-215vw"]);

    const [isDesktop, setIsDesktop] = React.useState(true);

    React.useEffect(() => {
        const checkDesktop = () => {
            const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
            setIsDesktop(window.innerWidth >= 768 && !isTouch);
        };
        checkDesktop();
        window.addEventListener("resize", checkDesktop);
        return () => window.removeEventListener("resize", checkDesktop);
    }, []);

    return (
        <section ref={targetRef} id="flavours" className={`relative bg-[#F7F7F7] ${isDesktop ? 'h-auto' : 'h-[300dvh]'}`}>
            {/* Mobile: Sticky 100dvh wrapper | Desktop: Standard relative block */}
            <div className={`w-full overflow-hidden flex flex-col justify-center z-[20] bg-[#F7F7F7] ${
                isDesktop 
                    ? 'relative py-24' 
                    : 'sticky top-0 h-[100dvh] py-0'
            }`}>
                
                {/* Header Container */}
                <div className={`w-full text-center px-4 shrink-0 transition-all duration-300 ${
                    isDesktop ? 'px-6 pt-0 mb-16' : 'pt-12 mb-2'
                }`}>
                    <motion.h2 
                        initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        className={`font-heading font-black italic tracking-tighter text-[#111111] uppercase max-w-4xl mx-auto drop-shadow-sm ${
                            isDesktop ? 'text-8xl' : 'text-4xl min-[400px]:text-5xl'
                        }`}
                    >
                        CHOOSE YOUR <span className={`font-wedges not-italic tracking-normal text-primary-blue bg-white inline-block border-[#111111] shadow-[4px_4px_0px_#111111] transform rotate-2 whitespace-nowrap ${
                            isDesktop 
                                ? 'px-4 py-1 border-4 shadow-[6px_6px_0px_#111111] rounded-3xl mx-2 mt-0' 
                                : 'px-3 py-0.5 border-2 rounded-[1.5rem] mx-1 mt-2'
                        }`}>FUSE.</span>
                    </motion.h2>
                    <p className={`font-heading font-bold italic text-gray-500 max-w-xl mx-auto uppercase tracking-wide leading-tight ${
                        isDesktop ? 'text-2xl mt-8' : 'text-sm min-[400px]:text-base mt-2'
                    }`}>
                        Zero Sugar. 100% Fun. Grab your flavor.
                    </p>
                </div>

                {/* Horizontal Sliding Track (Mobile) / Flex Row (Desktop) */}
                <div className={`w-full flex items-center relative z-10 overflow-visible ${
                    isDesktop ? 'flex-none justify-center' : 'flex-1'
                }`}>
                    <motion.div 
                        style={isDesktop ? undefined : { x, willChange: "transform" }} 
                        className={`flex items-center transform-gpu ${
                            isDesktop 
                                ? 'w-full flex-wrap justify-center h-auto px-6 gap-12' 
                                : 'w-max h-full px-[15vw] gap-[15vw]'
                        }`}
                    >
                        {FLAVORS.map((flavor, index) => (
                            <div key={index} className={`shrink-0 flex justify-center items-center ${
                                isDesktop ? 'h-auto pt-12 p-8' : 'h-full pb-4 pt-4'
                            }`}>
                                <FlavorCard flavor={flavor} isMobile={!isDesktop} />
                            </div>
                        ))}
                    </motion.div>
                </div>

            </div>
        </section>
    );
}

