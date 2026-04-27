"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, ShoppingCart, LogOut, Package, Mail } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    const isLoginPage = pathname === "/admin/login";

    useEffect(() => {
        if (isLoginPage) {
            setLoading(false);
            return;
        }

        const checkAuth = async () => {
            try {
                const res = await fetch("/api/auth/me");
                const data = await res.json();
                
                if (data.authenticated) {
                    setIsAuthenticated(true);
                } else {
                    router.push("/admin/login");
                }
            } catch (err) {
                router.push("/admin/login");
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [pathname, router, isLoginPage]);

    const handleLogout = async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        router.push("/admin/login");
    };

    if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-[#39FF14]">Loading...</div>;

    if (isLoginPage) return <>{children}</>;

    if (!isAuthenticated) return null;

    return (
        <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col md:flex-row font-body selection:bg-[#39FF14] selection:text-black">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-[#111111] border-r border-white/10 flex flex-col items-center py-8">
                <div className="mb-12 font-heading font-black text-2xl uppercase tracking-widest text-[#39FF14]">
                    COCO<span className="text-white">FUSE</span>
                </div>

                <nav className="flex flex-col w-full px-4 gap-2 flex-1">
                    <Link href="/admin" className={`flex items-center gap-3 px-5 py-3 rounded-xl transition-all ${pathname === "/admin" ? "bg-[#39FF14] text-black font-bold" : "text-gray-400 hover:text-white hover:bg-white/5"}`}>
                        <LayoutDashboard className="w-5 h-5" /> Dashboard
                    </Link>
                    <Link href="/admin/orders" className={`flex items-center gap-3 px-5 py-3 rounded-xl transition-all ${pathname.startsWith("/admin/orders") ? "bg-[#39FF14] text-black font-bold" : "text-gray-400 hover:text-white hover:bg-white/5"}`}>
                        <ShoppingCart className="w-5 h-5" /> Orders
                    </Link>
                    <Link href="/admin/subscribers" className={`flex items-center gap-3 px-5 py-3 rounded-xl transition-all ${pathname.startsWith("/admin/subscribers") ? "bg-[#39FF14] text-black font-bold" : "text-gray-400 hover:text-white hover:bg-white/5"}`}>
                        <Mail className="w-5 h-5" /> Subscribers
                    </Link>
                </nav>

                <div className="px-4 w-full mt-auto">
                    <button onClick={handleLogout} className="flex items-center justify-center w-full gap-2 px-5 py-3 border border-red-500/30 text-red-400 rounded-xl hover:bg-red-500/10 transition-colors uppercase font-heading text-xs font-bold tracking-widest">
                        <LogOut className="w-4 h-4" /> Logout
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto">
                <div className="p-8 md:p-12">
                    {children}
                </div>
            </main>
        </div>
    );
}
