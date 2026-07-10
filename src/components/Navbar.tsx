"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();
    const { scrollY } = useScroll();

    if (pathname?.startsWith("/admin")) return null;

    // Dynamic width on scroll for the pill effect
    const width = useTransform(scrollY, [0, 100], ["100%", "90%"]);
    const top = useTransform(scrollY, [0, 100], ["0px", "24px"]);
    const borderRadius = useTransform(scrollY, [0, 100], ["0px", "9999px"]);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "About Us", href: "/about" },
        { name: "Flavours", href: "/#flavours" },
        { name: "Track Order", href: "/track" },
    ];

    const handleScrollToFlavours = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (pathname === "/") {
            e.preventDefault();
            const element = document.getElementById("flavours");
            if (element) {
                if (typeof window !== "undefined" && (window as any).lenis) {
                    (window as any).lenis.scrollTo(element);
                } else {
                    element.scrollIntoView({ behavior: "smooth" });
                }
            }
        }
    };

    return (
        <motion.nav
            style={{ width, top, borderRadius }}
            className="absolute left-1/2 -translate-x-1/2 z-[100] bg-white border-b-4 border-x-4 border-[#111111] shadow-[4px_4px_0px_rgba(17,17,17,1)] flex items-center justify-between px-3 md:px-6 lg:px-12 h-16 md:h-20 origin-top overflow-visible transition-colors"
        >
            {/* Logo */}
            <a href="/" className="flex-shrink-0 relative z-[110] outline-none">
                <Image
                    src="/assets/client_logo.png"
                    alt="CocoFuse."
                    width={240}
                    height={80}
                    priority
                    className="h-10 sm:h-12 md:h-16 lg:h-20 w-auto object-contain transition-transform hover:scale-105"
                />
            </a>

            {/* Nav & CTA - Always Visible */}
            <div className={`flex items-center justify-end gap-3 sm:gap-6 md:gap-10 flex-1 ml-2 relative z-[110]`}>
                {navLinks.map((link) => (
                    <a
                        key={link.name}
                        href={link.href}
                        onClick={link.name === "Flavours" ? handleScrollToFlavours : undefined}
                        className={`block text-[11px] sm:text-xs md:text-sm font-heading font-black italic tracking-widest text-[#111111] uppercase hover:text-accent-watermelon transition-all hover:-translate-y-0.5 whitespace-nowrap`}
                    >
                        {link.name === 'About Us' ? (
                            <><span className="md:hidden">About</span><span className="hidden md:inline">About Us</span></>
                        ) : link.name}
                    </a>
                ))}

                <a 
                    href="/#flavours" 
                    onClick={handleScrollToFlavours}
                    className={`block px-4 py-2 md:px-6 md:py-2.5 bg-[#39FF14] text-[#111111] rounded-full font-heading font-black uppercase italic tracking-widest text-[12px] sm:text-sm border-2 border-[#111111] shadow-[2px_2px_0px_#111111] md:shadow-[3px_3px_0px_#111111] hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_#111111] transition-all whitespace-nowrap ml-1 sm:ml-2 animate-pulse hover:animate-none`}
                >
                    <span className="relative z-10">Buy Now</span>
                </a>
            </div>
        </motion.nav>
    );
}
