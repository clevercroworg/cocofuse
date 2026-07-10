"use client";

import { motion } from "framer-motion";

export default function Footer() {
    return (
        <footer className="bg-[#111111] text-primary-white pt-24 pb-12 relative overflow-hidden border-t-8 border-[#111111]">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-green via-primary-blue to-accent-mango" />

            <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="mb-16 md:mb-24 w-full"
                >
                    <h2 className="text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] font-heading font-black italic uppercase tracking-tighter leading-[0.85] mb-4 md:mb-6">
                        <span className="font-wedges not-italic tracking-normal text-[#7ED956]">COCO</span>
                        <span className="font-wedges not-italic tracking-normal text-[#3AB6FD]">FUSE.</span>
                    </h2>
                    <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-body font-medium text-white tracking-wide">
                        The anti-soda. The anti-sugar. <span className="text-[#E8314A] font-heading font-black italic uppercase">The anti-boring.</span>
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-4xl mb-16 border-t border-white/10 pt-12">
                    <div className="flex flex-col gap-3">
                        <h4 className="font-heading font-bold text-lg mb-2 text-primary-green">Product</h4>
                        <a href="/#flavours" className="text-gray-400 hover:text-white transition-colors">Flavours</a>
                        <a href="/#formula" className="text-gray-400 hover:text-white transition-colors">Ingredients</a>
                        <a href="/products/mango" className="text-gray-400 hover:text-white transition-colors">Nutrition</a>
                    </div>
                    <div className="flex flex-col gap-3">
                        <h4 className="font-heading font-bold text-lg mb-2 text-primary-blue">Brand</h4>
                        <a href="/about#manifesto" className="text-gray-400 hover:text-white transition-colors">Our Story</a>
                        <a href="/about" className="text-gray-400 hover:text-white transition-colors">Founders</a>
                        <a href="/about#manifesto" className="text-gray-400 hover:text-white transition-colors">Manifesto</a>
                    </div>
                    <div className="flex flex-col gap-3">
                        <h4 className="font-heading font-bold text-lg mb-2 text-accent-mango">Social</h4>
                        <a href="https://www.instagram.com/drinkcocofuse/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">Instagram</a>
                        <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">YouTube</a>
                        <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
                    </div>
                    <div className="flex flex-col gap-3">
                        <h4 className="font-heading font-bold text-lg mb-2 text-accent-watermelon">Legal</h4>
                        <a href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                        <a href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms & Conditions</a>
                        <a href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</a>
                    </div>
                </div>

                <div className="w-full flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm border-t border-white/5 pt-8">
                    <p>© {new Date().getFullYear()} <span className="font-wedges not-italic whitespace-nowrap"><span className="text-[#7ED956]">COCO</span><span className="text-[#3AB6FD]">FUSE.</span></span> All rights reserved.</p>
                    <p className="mt-4 md:mt-0">Clean hydration with attitude.</p>
                </div>
            </div>
        </footer>
    );
}
