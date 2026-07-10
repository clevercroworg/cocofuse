"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProgress } from "@react-three/drei";

/**
 * LoadingScreen — Shows a branded CocoFuse splash animation while
 * the site pre-renders (3D assets, fonts, heavy images).
 * Once everything is ready, it smoothly fades out revealing the site.
 */
export default function LoadingScreen() {
    const [isLoading, setIsLoading] = useState(true);
    const { active, progress, total } = useProgress();

    useEffect(() => {
        const ua = typeof navigator !== "undefined" ? navigator.userAgent : "";
        const isMobileOrWebview = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Instagram|FBAN|FBAV/i.test(ua) || (typeof window !== "undefined" && ('ontouchstart' in window || navigator.maxTouchPoints > 0));

        // Preload critical 3D assets into browser network cache
        const preloadAssets = async () => {
            try {
                // Skip the heavy 12.6 MB 3D model on mobile/webviews to optimize load speed
                const assetUrls = isMobileOrWebview ? [
                    '/assets/label_full.png',
                    '/assets/watermelon_label_extracted.png',
                    '/assets/chili_label_extracted.png',
                ] : [
                    '/Meshy_AI_Clear_plastic_water_b_0402103114_texture.glb',
                    '/assets/label_full.png',
                    '/assets/watermelon_label_extracted.png',
                    '/assets/chili_label_extracted.png',
                ];

                await Promise.all(
                    assetUrls.map(url =>
                        fetch(url, { priority: 'high' as RequestPriority })
                            .then(res => res.blob())
                            .catch(() => {}) 
                    )
                );
            } catch (e) {
                // Ignore silent network failures
            }
        };

        const prefetchTimeout = setTimeout(preloadAssets, 50);

        // Safety timeout — on mobile/webviews, reduce the block to 1.5s max for instant loading; on desktop keep 5s max
        const timeoutDuration = isMobileOrWebview ? 1500 : 5000;
        const maxTimeout = setTimeout(() => {
            setIsLoading(false);
        }, timeoutDuration);

        return () => {
            clearTimeout(prefetchTimeout);
            clearTimeout(maxTimeout);
        };
    }, []);

    // Listen to the actual 3D WebGL loading state
    useEffect(() => {
        // If three.js reports it has finished loading all queued assets
        if (progress === 100 && total > 0 && !active) {
            // Add a tiny 300ms buffer to allow the GPU to paint the first frame
            const hideTimer = setTimeout(() => {
                setIsLoading(false);
            }, 300);
            return () => clearTimeout(hideTimer);
        }
    }, [progress, total, active]);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    key="loading-screen"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#111111]"
                    style={{ willChange: "opacity" }}
                >
                    {/* Minimalist glow */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50">
                        <motion.div 
                            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] bg-[#7ED956]/10 rounded-full blur-[100px]" 
                        />
                    </div>

                    {/* Logo */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ scale: 1.05, opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="relative z-10 flex flex-col items-center"
                    >
                        <h1 className="text-5xl sm:text-7xl md:text-8xl font-wedges tracking-normal select-none relative">
                            {/* Base text */}
                            <span className="text-[#7ED956]">COCO</span>
                            <span className="text-[#3AB6FD]">FUSE.</span>
                            
                            {/* Glowing outline effect */}
                            <motion.span 
                                animate={{ opacity: [0.2, 0.8, 0.2] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute inset-0 blur-sm pointer-events-none select-none text-[#7ED956] z-[-1]"
                            >
                                <span className="text-[#7ED956]">COCO</span>
                                <span className="text-[#3AB6FD]">FUSE.</span>
                            </motion.span>
                        </h1>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
