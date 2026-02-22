"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X } from "lucide-react";

const surprises = [
    //  Using the my.spline.design viewer URLs which are stable in iframes
    {
        fact: "The first computer bug was an actual moth found trapped in a Harvard Mark II relay in 1947.",
    },
    {
        fact: "There are more than 700 computing languages in active use today, but only a handful power 90% of the web.",
    },
    {
        fact: "The Apollo 11 Guidance Computer that put man on the moon had less processing power than a basic modern USB-C charger.",
    },
    {
        fact: "A single Google query uses 1,000 computers in 0.2 seconds to retrieve an answer.",
    },
];

export function SurpriseMe() {
    const [isOpen, setIsOpen] = useState(false);
    const [currentSurprise, setCurrentSurprise] = useState(surprises[0]);

    const triggerSurprise = () => {
        // Pick a random surprise
        const randomSurprise = surprises[Math.floor(Math.random() * surprises.length)];
        setCurrentSurprise(randomSurprise);
        setIsOpen(true);
    };

    return (
        <>
            {/* Floating Action Button */}
            <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 1 }}
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
                onClick={triggerSurprise}
                className="fixed bottom-6 right-6 md:bottom-12 md:right-12 z-50 p-4 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-indigo-500/30 flex items-center justify-center group"
            >
                <Sparkles size={24} className="group-hover:animate-pulse" />
                <span className="absolute -top-10 right-0 w-max bg-white/10 backdrop-blur-md px-3 py-1 rounded-md text-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10">
                    Surprise Me!
                </span>
            </motion.button>

            {/* Fullscreen Modal Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-lg p-4 md:p-12"
                    >
                        {/* Modal Content Container */}
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="relative w-full max-w-2xl bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden flex flex-col shadow-2xl"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-white text-white hover:text-black rounded-full transition-colors backdrop-blur-md"
                            >
                                <X size={20} />
                            </button>

                            {/* Fun Fact Section */}
                            <div className="p-8 md:p-12 flex flex-col justify-center bg-gradient-to-br from-zinc-900 to-black text-center items-center">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.1 }}
                                    className="flex flex-col items-center"
                                >
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 text-sm font-medium mb-6">
                                        <Sparkles size={14} />
                                        Tech Fun Fact
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-bold text-white leading-relaxed mb-8">
                                        &quot;{currentSurprise.fact}&quot;
                                    </h3>

                                    <button
                                        onClick={triggerSurprise}
                                        className="px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-indigo-500 hover:text-white transition-colors duration-300 w-max"
                                    >
                                        Generate Another
                                    </button>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
