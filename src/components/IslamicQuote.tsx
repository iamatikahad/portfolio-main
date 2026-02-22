"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const quotes = [
    {
        arabic: "إِنَّ مَعَ العُسرِ يُسرًا",
        translation: "Verily, with hardship comes ease.",
        reference: "Quran 94:6"
    },
    {
        arabic: "وَاصْبِرْ فَإِنَّ اللَّهَ لَا يُضِيعُ أَجْرَ الْمُحْسِنِينَ",
        translation: "And be patient, for indeed, Allah does not allow to be lost the reward of those who do good.",
        reference: "Quran 11:115"
    },
    {
        arabic: "فَاذْكُرُونِي أَذْكُرْكُمْ",
        translation: "So remember Me; I will remember you.",
        reference: "Quran 2:152"
    },
    {
        arabic: "لَا تَحْزَنْ إِنَّ اللَّهَ مَعَنَا",
        translation: "Do not grieve; indeed Allah is with us.",
        reference: "Quran 9:40"
    },
    {
        arabic: "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ",
        translation: "Sufficient for us is Allah, and [He is] the best Disposer of affairs.",
        reference: "Quran 3:173"
    }
];

export function IslamicQuote() {
    const [quoteIndex, setQuoteIndex] = useState<number | null>(null);

    useEffect(() => {
        // Select a random quote on component mount (client-side only to avoid hydration mismatch)
        setQuoteIndex(Math.floor(Math.random() * quotes.length));
    }, []);

    if (quoteIndex === null) return null;

    const quote = quotes[quoteIndex];

    return (
        <div className="w-full bg-[#121212] py-24 px-6 relative overflow-hidden border-t border-white/5">
            {/* Subtle background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-emerald-900/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-4xl mx-auto text-center relative z-10">
                <AnimatePresence>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="flex flex-col items-center justify-center space-y-8"
                    >
                        {/* Context Label */}
                        <span className="text-emerald-500/80 text-xs font-bold uppercase tracking-[0.3em]">
                            Daily Reminder
                        </span>

                        {/* Arabic Script */}
                        <h3
                            className="text-3xl md:text-5xl lg:text-6xl text-white font-arabic leading-relaxed drop-shadow-lg"
                            style={{ fontFamily: "'Scheherazade New', 'Amiri', serif" }}
                            dir="rtl"
                        >
                            {quote.arabic}
                        </h3>

                        {/* Translation & Reference */}
                        <div className="space-y-3">
                            <p className="text-lg md:text-xl text-zinc-300 font-medium italic max-w-2xl mx-auto leading-relaxed">
                                "{quote.translation}"
                            </p>
                            <p className="text-sm text-zinc-500 font-semibold tracking-wider uppercase">
                                &mdash; {quote.reference}
                            </p>
                        </div>

                        {/* Subtle separator */}
                        <div className="w-12 h-[1px] bg-emerald-500/30 mt-8" />
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
