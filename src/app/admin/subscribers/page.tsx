"use client";

import { useEffect, useState } from "react";
import { Mail, Download } from "lucide-react";

interface Subscriber {
    id: string;
    name: string;
    email: string;
    subscribedAt: string;
}

export default function AdminSubscribers() {
    const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSubscribers = async () => {
            try {
                const res = await fetch("/api/subscribers");
                const data = await res.json();
                
                if (data.subscribers) {
                    setSubscribers(data.subscribers);
                }
            } catch (err) {
                console.error("Failed to fetch subscribers:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchSubscribers();
    }, []);

    const downloadCSV = () => {
        if (subscribers.length === 0) return;
        
        const headers = ["Name", "Email", "Subscribed At"];
        const rows = subscribers.map(sub => [
            sub.name,
            sub.email,
            new Date(sub.subscribedAt).toLocaleString()
        ]);
        
        const csvContent = [headers.join(","), ...rows.map(r => r.map(cell => `"${cell}"`).join(","))].join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `subscribers_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (loading) return <div>Loading subscribers...</div>;

    return (
        <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <h1 className="text-3xl font-heading font-black uppercase tracking-widest text-[#39FF14]">Subscribers</h1>
                    <div className="bg-white/10 px-3 py-1 rounded-full text-sm font-bold">{subscribers.length} total</div>
                </div>
                <button onClick={downloadCSV} className="flex items-center gap-2 bg-[#39FF14] text-black px-4 py-2 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-[#39FF14]/80 transition-colors">
                    <Download className="w-4 h-4" /> Export CSV
                </button>
            </div>

            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left font-body text-sm">
                        <thead className="text-white/40 border-b border-white/10 uppercase font-heading text-xs tracking-widest">
                            <tr>
                                <th className="pb-3 px-4">Name</th>
                                <th className="pb-3 px-4">Email</th>
                                <th className="pb-3 px-4">Subscribed At</th>
                                <th className="pb-3 px-4">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subscribers.map(sub => (
                                <tr key={sub.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="py-4 px-4 font-bold">{sub.name}</td>
                                    <td className="py-4 px-4 text-white/80">{sub.email}</td>
                                    <td className="py-4 px-4 text-white/50">{new Date(sub.subscribedAt).toLocaleDateString()} {new Date(sub.subscribedAt).toLocaleTimeString()}</td>
                                    <td className="py-4 px-4">
                                        <a href={`mailto:${sub.email}`} className="text-[#39FF14] hover:text-white transition-colors flex items-center gap-2 text-xs uppercase font-heading tracking-widest font-bold">
                                            <Mail className="w-4 h-4" /> Email
                                        </a>
                                    </td>
                                </tr>
                            ))}
                            {subscribers.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="py-8 text-center text-white/50 font-body italic">No subscribers yet.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
