"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Timings {
    Fajr: string;
    Dhuhr: string;
    Asr: string;
    Maghrib: string;
    Isha: string;
    [key: string]: string; // Sunrise, Sunset, etc.
}

interface PrayerData {
    timings: Timings;
    date: {
        readable: string;
        hijri: {
            date: string;
            month: { en: string; ar: string };
            year: string;
            designation: { abbreviated: string };
        };
    };
}

export function PrayerTimes() {
    const [prayerData, setPrayerData] = useState<PrayerData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch timings for Dhaka, Bangladesh
        // Method 1: University of Islamic Sciences, Karachi (standard for South Asia)
        const fetchTimes = async () => {
            try {
                const res = await fetch("https://api.aladhan.com/v1/timingsByCity?city=Dhaka&country=Bangladesh&method=1");
                const data = await res.json();
                if (data && data.data) {
                    setPrayerData(data.data);
                }
            } catch (error) {
                console.error("Failed to fetch prayer times:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTimes();
    }, []);

    const prayers = [
        { name: "Fajr", key: "Fajr", icon: "🌅" },
        { name: "Dhuhr", key: "Dhuhr", icon: "☀️" },
        { name: "Asr", key: "Asr", icon: "🌤️" },
        { name: "Maghrib", key: "Maghrib", icon: "🌇" },
        { name: "Isha", key: "Isha", icon: "🌙" },
    ];

    // Helper to convert 24h to 12h format
    const formatTime = (timeStr: string) => {
        if (!timeStr) return "";
        const [hoursStr, minutes] = timeStr.split(":");
        let hours = parseInt(hoursStr, 10);
        const ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;
        return `${hours}:${minutes} ${ampm}`;
    };

    return (
        <section className="relative w-full min-h-[60vh] py-24 px-6 md:px-12 flex items-center justify-center overflow-hidden bg-black border-t border-white/5">
            {/* Aesthetic Mosque Background */}
            <div className="absolute inset-0 z-0 opacity-40">
                <img
                    src="https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&q=80&w=2000"
                    alt="Mosque architecture background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-black/50 to-transparent" />
                <div className="absolute inset-0 bg-indigo-900/20 mix-blend-multiply" />
            </div>

            <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight drop-shadow-lg">
                        Salah Timings
                    </h2>
                    {prayerData && (
                        <p className="text-zinc-300 md:text-lg flex flex-col md:flex-row items-center gap-2 justify-center drop-shadow-md">
                            <span>Dhaka, Bangladesh</span>
                            <span className="hidden md:inline text-indigo-400">&bull;</span>
                            <span>{prayerData.date.readable}</span>
                            <span className="hidden md:inline text-indigo-400">&bull;</span>
                            <span className="text-indigo-300">{prayerData.date.hijri.date} {prayerData.date.hijri.month.en} {prayerData.date.hijri.year}</span>
                        </p>
                    )}
                </motion.div>

                <div className="w-full grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
                    {loading ? (
                        <div className="col-span-2 md:col-span-5 flex justify-center py-12">
                            <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                        </div>
                    ) : (
                        prayers.map((prayer, index) => (
                            <motion.div
                                key={prayer.name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="relative overflow-hidden rounded-2xl p-6 flex flex-col items-center justify-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 group shadow-2xl"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                <span className="text-3xl md:text-4xl drop-shadow-md">{prayer.icon}</span>
                                <h3 className="text-lg md:text-xl font-bold text-white tracking-wide uppercase">
                                    {prayer.name}
                                </h3>
                                <div className="h-[1px] w-12 bg-indigo-500/50 my-1 group-hover:w-full transition-all duration-500" />
                                <p className="text-xl md:text-2xl font-semibold text-indigo-300">
                                    {prayerData ? formatTime(prayerData.timings[prayer.key]) : "--:--"}
                                </p>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}
