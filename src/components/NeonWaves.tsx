"use client";

import { motion } from "framer-motion";

export function NeonWaves() {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40 blur-[4px]">
            <svg
                className="absolute w-[200%] md:w-full h-[150%] top-[-25%] left-[-50%] md:left-0 mix-blend-screen"
                viewBox="0 0 1440 800"
                preserveAspectRatio="none"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Wave 1 - Indigo */}
                <motion.path
                    d="M-200 500 C 200 350, 500 650, 800 500 C 1100 350, 1400 650, 1600 500"
                    stroke="url(#gradient-indigo)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    style={{ filter: "drop-shadow(0 0 30px rgba(99,102,241,1))" }}
                    animate={{
                        d: [
                            "M-200 500 C 200 350, 500 650, 800 500 C 1100 350, 1400 650, 1600 500",
                            "M-200 500 C 200 650, 500 350, 800 500 C 1100 650, 1400 350, 1600 500",
                            "M-200 500 C 200 350, 500 650, 800 500 C 1100 350, 1400 650, 1600 500",
                        ]
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                {/* Wave 2 - Purple */}
                <motion.path
                    d="M-200 500 C 200 650, 400 300, 900 500 C 1400 700, 1500 350, 1700 500"
                    stroke="url(#gradient-purple)"
                    strokeWidth="5"
                    strokeLinecap="round"
                    style={{ filter: "drop-shadow(0 0 30px rgba(168,85,247,1))" }}
                    animate={{
                        d: [
                            "M-200 500 C 200 650, 400 300, 900 500 C 1400 700, 1500 350, 1700 500",
                            "M-200 500 C 300 350, 600 650, 1000 500 C 1300 300, 1600 650, 1700 500",
                            "M-200 500 C 200 650, 400 300, 900 500 C 1400 700, 1500 350, 1700 500",
                        ]
                    }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2
                    }}
                />

                {/* Wave 3 - Blue */}
                <motion.path
                    d="M-200 500 C 300 700, 600 350, 1000 500 C 1400 650, 1600 400, 1800 500"
                    stroke="url(#gradient-blue)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    style={{ filter: "drop-shadow(0 0 25px rgba(59,130,246,1))" }}
                    animate={{
                        d: [
                            "M-200 500 C 300 700, 600 350, 1000 500 C 1400 650, 1600 400, 1800 500",
                            "M-200 500 C 200 350, 700 700, 900 500 C 1300 700, 1500 350, 1800 500",
                            "M-200 500 C 300 700, 600 350, 1000 500 C 1400 650, 1600 400, 1800 500",
                        ]
                    }}
                    transition={{
                        duration: 35,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 4
                    }}
                />

                <defs>
                    <linearGradient id="gradient-indigo" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="transparent" />
                        <stop offset="30%" stopColor="#4f46e5" />
                        <stop offset="70%" stopColor="#818cf8" />
                        <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                    <linearGradient id="gradient-purple" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="transparent" />
                        <stop offset="20%" stopColor="#9333ea" />
                        <stop offset="80%" stopColor="#c084fc" />
                        <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                    <linearGradient id="gradient-blue" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="transparent" />
                        <stop offset="40%" stopColor="#2563eb" />
                        <stop offset="60%" stopColor="#60a5fa" />
                        <stop offset="100%" stopColor="transparent" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
}
