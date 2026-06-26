"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Phone, MapPin, Award, Building, Users } from "lucide-react";
import Footer from "@/components/Footer";

export default function ContactPage() {
    const contactInfo = [
        {
            icon: <Mail className="w-6 h-6 text-[#111111]" />,
            title: "Email Us",
            bgColor: "bg-primary-green",
            shadowColor: "shadow-[6px_6px_0px_#7ED956]",
            details: [
                { label: "General Support", value: "hello@cocofuse.in" },
                { label: "Business Enquiries", value: "Miket@rootupfnb.com" }
            ],
            isLink: true,
            linkPrefix: "mailto:"
        },
        {
            icon: <Phone className="w-6 h-6 text-[#111111]" />,
            title: "Call Us",
            bgColor: "bg-primary-blue",
            shadowColor: "shadow-[6px_6px_0px_#3AB6FD]",
            details: [
                { label: "Customer Care", value: "+91 70216 39310" }
            ],
            isLink: true,
            linkPrefix: "tel:"
        }
    ];

    const corporateDetails = [
        {
            icon: <Building className="w-6 h-6 text-[#111111]" />,
            title: "Corporate Identity",
            bgColor: "bg-accent-mango",
            shadowColor: "shadow-[6px_6px_0px_#FFD166]",
            info: [
                { label: "Entity Name", value: "ROOTUP BEVERAGES AND NUTRIMENTS LLP" },
                { label: "LLPIN", value: "ACT-4734" },
                { label: "GSTIN", value: "27ABMFR7972B1ZS" },
                { label: "Date of Inc.", value: "15/12/2025" }
            ]
        },
        {
            icon: <Award className="w-6 h-6 text-[#111111]" />,
            title: "FSSAI Licenses",
            bgColor: "bg-accent-basil",
            shadowColor: "shadow-[6px_6px_0px_#39FF14]",
            info: [
                { label: "Marketed By License", value: "21526020000341" },
                { label: "Manufactured By License", value: "11525015000189" },
                { label: "Manufacturer", value: "Pure Foods & Beverages (Navi Mumbai)" }
            ]
        }
    ];

    return (
        <main className="min-h-screen bg-[#F3F3F1] text-[#111111] font-body">
            {/* Hero */}
            <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-[#111111] overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-green via-primary-blue to-accent-mango" />
                <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] bg-[#3AB6FD]/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[50%] bg-[#FFD166]/10 rounded-full blur-[100px]" />

                <div className="container mx-auto px-6 md:px-12 relative z-10">
                    <Link href="/" className="inline-flex items-center gap-2 font-heading font-black uppercase tracking-widest text-sm mb-8 text-white/60 hover:text-white transition-colors">
                        ← Back to Home
                    </Link>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl sm:text-6xl md:text-8xl font-heading font-black italic uppercase tracking-tighter text-white leading-[0.85]"
                    >
                        Contact <br />
                        <span className="text-[#FFD166]">Us</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mt-6 text-white/60 font-body text-lg md:text-xl max-w-2xl"
                    >
                        Questions, feedback, or corporate inquiries? Reach out to the team behind the anti-soda.
                    </motion.p>
                    <div className="w-20 h-2 bg-[#FFD166] rounded-full mt-6" />
                </div>
            </section>

            {/* Content Details */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-6 md:px-12 max-w-6xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        {/* Support Cards */}
                        {contactInfo.map((card, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className={`bg-white border-4 border-[#111111] p-8 rounded-3xl ${card.shadowColor} flex flex-col justify-between`}
                            >
                                <div>
                                    <div className={`w-12 h-12 rounded-2xl ${card.bgColor} border-2 border-[#111111] flex items-center justify-center shadow-[2px_2px_0px_#111111] mb-6`}>
                                        {card.icon}
                                    </div>
                                    <h2 className="text-3xl font-heading font-black italic uppercase tracking-tight mb-4">{card.title}</h2>
                                    <div className="flex flex-col gap-3">
                                        {card.details.map((detail, dIdx) => (
                                            <div key={dIdx} className="font-body">
                                                <span className="block text-xs uppercase tracking-wider font-bold text-gray-400 mb-1">{detail.label}</span>
                                                {card.isLink ? (
                                                    <a
                                                        href={`${card.linkPrefix}${detail.value}`}
                                                        className="text-lg md:text-xl font-heading font-black text-[#111111] hover:text-accent-watermelon transition-colors break-words"
                                                    >
                                                        {detail.value}
                                                    </a>
                                                ) : (
                                                    <span className="text-lg md:text-xl font-heading font-black text-[#111111]">{detail.value}</span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Address & Office */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="bg-white border-4 border-[#111111] p-8 rounded-3xl shadow-[6px_6px_0px_#E8314A] lg:col-span-2 flex flex-col justify-between"
                        >
                            <div>
                                <div className="w-12 h-12 rounded-2xl bg-accent-watermelon border-2 border-[#111111] flex items-center justify-center shadow-[2px_2px_0px_#111111] mb-6">
                                    <MapPin className="w-6 h-6 text-[#111111]" />
                                </div>
                                <h2 className="text-3xl font-heading font-black italic uppercase tracking-tight mb-4">Registered Office</h2>
                                <p className="text-lg md:text-xl font-heading font-bold text-gray-700 leading-relaxed max-w-xl">
                                    15-A/1004, Happy Home Residency, Next to Seven Eleven School, Unique Garden Layout, Mira Road East, Mira Bhayandar, Thane, Maharashtra, India - 401107
                                </p>
                            </div>
                        </motion.div>

                        {/* Management / Designated Partners */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="bg-white border-4 border-[#111111] p-8 rounded-3xl shadow-[6px_6px_0px_#111111] flex flex-col justify-between"
                        >
                            <div>
                                <div className="w-12 h-12 rounded-2xl bg-white border-2 border-[#111111] flex items-center justify-center shadow-[2px_2px_0px_#111111] mb-6">
                                    <Users className="w-6 h-6 text-[#111111]" />
                                </div>
                                <h2 className="text-3xl font-heading font-black italic uppercase tracking-tight mb-4">LLP Partners</h2>
                                <div className="flex flex-col gap-3">
                                    <span className="block text-xs uppercase tracking-wider font-bold text-gray-400 mb-1">Designated Partners</span>
                                    <ul className="text-lg font-heading font-black text-[#111111] space-y-1">
                                        <li>• MIKET KUMAN RANPARA</li>
                                        <li>• DHANANJAY RAGVENDRA SHETTY</li>
                                        <li>• JOEL FERMINO CORREIA</li>
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Corporate & Registration Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                        {corporateDetails.map((block, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className={`bg-white border-4 border-[#111111] p-8 rounded-3xl ${block.shadowColor} flex flex-col justify-between`}
                            >
                                <div>
                                    <div className={`w-12 h-12 rounded-2xl ${block.bgColor} border-2 border-[#111111] flex items-center justify-center shadow-[2px_2px_0px_#111111] mb-6`}>
                                        {block.icon}
                                    </div>
                                    <h2 className="text-3xl font-heading font-black italic uppercase tracking-tight mb-4">{block.title}</h2>
                                    <div className="grid grid-cols-1 gap-4">
                                        {block.info.map((item, itemIdx) => (
                                            <div key={itemIdx} className="border-b border-gray-100 pb-2 last:border-b-0 last:pb-0">
                                                <span className="block text-xs uppercase tracking-wider font-bold text-gray-400 mb-1">{item.label}</span>
                                                <span className="text-base md:text-lg font-heading font-black text-[#111111]">{item.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
