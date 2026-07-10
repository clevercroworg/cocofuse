"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Float, ContactShadows } from "@react-three/drei";
import { Suspense, useRef, useState, useEffect } from "react";
import { MotionValue, useInView } from "framer-motion";
import Bottle from "./Bottle";

export default function Scene({ 
    scrollY, 
    vh, 
    labelPath, 
    liquidColor, 
    capColor,
    isStaticMobile
}: { 
    scrollY?: MotionValue<number>, 
    vh?: number,
    labelPath?: string,
    liquidColor?: string,
    capColor?: string,
    isStaticMobile?: boolean
}) {
    const containerRef = useRef<HTMLDivElement>(null);
    // 200px margin ensures it starts rendering just before it enters the viewport to prevent delay
    const isInView = useInView(containerRef, { margin: "200px" });

    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        setIsMobile(window.innerWidth < 1024 || isTouch);
    }, []);

    return (
        <div ref={containerRef} className="w-full h-full pointer-events-none">
            <Canvas
                frameloop={isInView ? "always" : "never"}
                camera={{ position: [0, 0, 10], fov: 45 }}
                gl={{ antialias: !isMobile, alpha: true, powerPreference: "high-performance" }}
                dpr={isMobile ? 1 : [1, 2]}
            >
                <ambientLight intensity={1.5} />
                <directionalLight position={[10, 10, 10]} intensity={2} />
                {!isMobile && (
                    <>
                        <spotLight position={[-10, 10, 10]} intensity={1.5} angle={0.3} penumbra={1} color="#f97316" />
                        <spotLight position={[10, -10, 10]} intensity={1} angle={0.3} penumbra={1} color="#4ade80" />
                    </>
                )}

                <Suspense fallback={null}>
                    {isStaticMobile ? (
                        <Bottle 
                            vh={vh} 
                            labelPath={labelPath} 
                            liquidColor={liquidColor} 
                            capColor={capColor} 
                        />
                    ) : (
                        <Float
                            speed={2}
                            rotationIntensity={0}
                            floatIntensity={isMobile ? 0 : 0.5}
                            floatingRange={[-0.05, 0.05]}
                        >
                            <Bottle 
                                scrollY={scrollY} 
                                vh={vh} 
                                labelPath={labelPath} 
                                liquidColor={liquidColor} 
                                capColor={capColor} 
                            />
                        </Float>
                    )}

                    <Environment preset="city" />
                    {!isMobile && (
                        <ContactShadows position={[0, -3, 0]} opacity={0.6} scale={15} blur={2.5} far={4} color="#f97316" />
                    )}
                </Suspense>
            </Canvas>
        </div>
    );
}


