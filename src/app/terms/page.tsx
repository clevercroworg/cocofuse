"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function TermsPage() {
    const sections = [
        {
            title: "Acceptance of Terms",
            content: `By accessing or using the CocoFuse. website and purchasing our products, you agree to be bound by these Terms & Conditions. If you do not agree to these terms, please do not use our services. We reserve the right to modify these terms at any time, and your continued use of the site constitutes acceptance of those changes.`
        },
        {
            title: "Products & Ordering",
            content: `All product descriptions, images, and pricing on our website are provided as accurately as possible. However, we do not warrant that product descriptions or pricing are error-free. We reserve the right to:\n\n• Modify or discontinue any product without prior notice\n• Limit quantities of any products we offer\n• Refuse any order at our discretion\n• Cancel orders if fraud or unauthorized activity is detected\n\nPrices are inclusive of applicable taxes unless stated otherwise.`
        },
        {
            title: "Payment & Billing",
            content: `We accept payments through UPI, credit/debit cards, net banking, and select digital wallets. All payment information is processed securely through certified third-party payment gateways. By providing your payment details, you confirm that you are authorized to use the selected payment method. Orders are confirmed only after successful payment verification.`
        },
        {
            title: "Shipping & Delivery",
            content: `We aim to deliver your orders within the estimated delivery timeline provided at checkout. Delivery times may vary based on your location and product availability. We are not liable for delays caused by third-party logistics providers, natural calamities, or circumstances beyond our control. Risk of loss passes to you upon delivery of the product to the carrier.`
        },
        {
            title: "Returns & Refunds",
            content: `Due to the perishable nature of our products, returns are accepted only in the following cases:\n\n• Product received is damaged or defective\n• Incorrect product delivered\n• Product received past its best-before date\n\nRefund requests must be raised within 48 hours of delivery with supporting evidence (photographs). Approved refunds will be processed within 7-10 business days to the original payment method.`
        },
        {
            title: "Intellectual Property",
            content: `All content on this website — including but not limited to the CocoFuse. brand name, logo, product names, graphics, design elements, text, images, and code — is the exclusive property of CocoFuse. and is protected by applicable intellectual property laws. Unauthorized use, reproduction, or distribution of any material from this website is strictly prohibited.`
        },
        {
            title: "User Conduct",
            content: `When using our website, you agree NOT to:\n\n• Use the site for any unlawful purpose\n• Attempt to gain unauthorized access to our systems\n• Transmit any harmful code, viruses, or malicious software\n• Infringe upon the rights of others\n• Scrape, data-mine, or extract information from our website\n• Misrepresent your identity or affiliation`
        },
        {
            title: "Limitation of Liability",
            content: `CocoFuse. shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our website or products. Our total liability for any claim related to our products or services shall not exceed the amount paid by you for the specific product or service giving rise to the claim.`
        },
        {
            title: "Governing Law",
            content: `These Terms & Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising from or related to these terms shall be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra, India.`
        },
        {
            title: "Contact Us",
            content: `For any questions, concerns, or disputes regarding these Terms & Conditions, please contact us at:\n\nEntity Name: ROOTUP BEVERAGES AND NUTRIMENTS LLP\nLLPIN: ACT-4734\nGSTIN: 27ABMFR7972B1ZS\nFSSAI License (Marketed By): 21526020000341\nFSSAI License (Manufactured By): 11525015000189\n\nRegistered Office Address:\n15-A/1004, Happy Home Residency, Next to Seven Eleven School, Unique Garden Layout, Mira Road East, Mira Bhayandar, Thane, Maharashtra, India - 401107\n\nEmail: hello@cocofuse.in / Miket@rootupfnb.com\nPhone: +91 70216 39310`
        }
    ];

    return (
        <main className="min-h-screen bg-[#F3F3F1] text-[#111111] font-body">
            {/* Hero */}
            <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-[#111111] overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-green via-primary-blue to-accent-mango" />
                <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] bg-primary-blue/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[50%] bg-accent-mango/10 rounded-full blur-[100px]" />

                <div className="container mx-auto px-6 md:px-12 relative z-10">
                    <Link href="/" className="inline-flex items-center gap-2 font-heading font-black uppercase tracking-widest text-sm mb-8 text-white/60 hover:text-white transition-colors">
                        ← Back to Home
                    </Link>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl sm:text-6xl md:text-8xl font-heading font-black italic uppercase tracking-tighter text-white leading-[0.85]"
                    >
                        Terms & <br />
                        <span className="text-primary-blue">Conditions</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mt-6 text-white/60 font-body text-lg md:text-xl max-w-2xl"
                    >
                        The ground rules for sipping with us. Fair, transparent, no fine-print tricks.
                    </motion.p>
                    <div className="w-20 h-2 bg-primary-blue rounded-full mt-6" />
                    <p className="mt-8 text-white/40 text-sm font-heading font-bold uppercase tracking-widest">
                        Last Updated: April 2026
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-6 md:px-12 max-w-4xl">
                    {sections.map((section, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: idx * 0.05 }}
                            className="mb-12 last:mb-0"
                        >
                            <div className="flex items-start gap-4 mb-4">
                                <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[#111111] text-white flex items-center justify-center font-heading font-black text-sm">
                                    {String(idx + 1).padStart(2, '0')}
                                </span>
                                <h2 className="text-2xl md:text-3xl font-heading font-black italic uppercase tracking-tight text-[#111111] pt-1">
                                    {section.title}
                                </h2>
                            </div>
                            <div className="ml-14 bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm">
                                <p className="text-gray-700 font-body text-base md:text-lg leading-relaxed whitespace-pre-line">
                                    {section.content}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    );
}
