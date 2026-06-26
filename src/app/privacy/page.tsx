"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
    const sections = [
        {
            title: "Information We Collect",
            content: `When you visit our website, place an order, or interact with our services, we may collect the following types of information:\n\n• Personal identification details (name, email address, phone number)\n• Shipping and billing address\n• Payment information (processed securely through third-party payment gateways)\n• Device and browser information for analytics purposes\n• Cookies and usage data to improve your experience`
        },
        {
            title: "How We Use Your Information",
            content: `We use the information we collect to:\n\n• Process and fulfill your orders\n• Communicate with you about your orders, products, and promotions\n• Improve our website, products, and customer service\n• Personalize your experience and deliver relevant content\n• Comply with legal obligations and protect our rights`
        },
        {
            title: "Data Protection & Security",
            content: `We implement industry-standard security measures to protect your personal data. All payment transactions are processed through secure, encrypted channels. We do not store your complete credit/debit card information on our servers. Access to personal data is restricted to authorized personnel only.`
        },
        {
            title: "Cookies & Tracking",
            content: `Our website uses cookies and similar tracking technologies to enhance your browsing experience. These help us understand how you interact with our site, remember your preferences, and serve relevant content. You can manage your cookie preferences through your browser settings at any time.`
        },
        {
            title: "Third-Party Services",
            content: `We may share limited information with trusted third-party service providers who assist us with:\n\n• Payment processing\n• Order fulfillment and shipping\n• Website analytics\n• Marketing and communications\n\nThese partners are bound by confidentiality agreements and are not permitted to use your information for any other purpose.`
        },
        {
            title: "Your Rights",
            content: `You have the right to:\n\n• Access, correct, or delete your personal data\n• Opt out of marketing communications at any time\n• Request a copy of the data we hold about you\n• Lodge a complaint with a data protection authority\n\nTo exercise any of these rights, please contact us at the details provided below.`
        },
        {
            title: "Data Retention",
            content: `We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy, comply with our legal obligations, resolve disputes, and enforce our agreements. Order-related data is retained for a minimum period as required by applicable tax and commerce regulations.`
        },
        {
            title: "Changes to This Policy",
            content: `We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date. We encourage you to review this policy periodically to stay informed about how we protect your information.`
        },
        {
            title: "Contact Us",
            content: `If you have any questions or concerns about this Privacy Policy or our data practices, please reach out to us at:\n\nEntity Name: ROOTUP BEVERAGES AND NUTRIMENTS LLP\nLLPIN: ACT-4734\nGSTIN: 27ABMFR7972B1ZS\nFSSAI License (Marketed By): 21526020000341\nFSSAI License (Manufactured By): 11525015000189\n\nRegistered Office Address:\n15-A/1004, Happy Home Residency, Next to Seven Eleven School, Unique Garden Layout, Mira Road East, Mira Bhayandar, Thane, Maharashtra, India - 401107\n\nEmail: hello@cocofuse.in / Miket@rootupfnb.com\nPhone: +91 70216 39310`
        }
    ];

    return (
        <main className="min-h-screen bg-[#F3F3F1] text-[#111111] font-body">
            {/* Hero */}
            <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-[#111111] overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-green via-primary-blue to-accent-mango" />
                <div className="absolute top-[20%] left-[-10%] w-[40%] h-[60%] bg-primary-green/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-5%] w-[30%] h-[50%] bg-primary-blue/10 rounded-full blur-[100px]" />

                <div className="container mx-auto px-6 md:px-12 relative z-10">
                    <Link href="/" className="inline-flex items-center gap-2 font-heading font-black uppercase tracking-widest text-sm mb-8 text-white/60 hover:text-white transition-colors">
                        ← Back to Home
                    </Link>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl sm:text-6xl md:text-8xl font-heading font-black italic uppercase tracking-tighter text-white leading-[0.85]"
                    >
                        Privacy <br />
                        <span className="text-primary-green">Policy</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mt-6 text-white/60 font-body text-lg md:text-xl max-w-2xl"
                    >
                        Your trust matters. Here's how we protect and handle your data.
                    </motion.p>
                    <div className="w-20 h-2 bg-primary-green rounded-full mt-6" />
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
