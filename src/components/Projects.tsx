"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useLenis } from "lenis/react";
import { NeonWaves } from "@/components/NeonWaves";

const projects = [
    {
        id: 1,
        title: "Fintech Mobile Bank",
        category: "Flutter app",
        description: "A secure, feature-rich banking application built with Flutter and Dart.",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 2,
        title: "E-Commerce App",
        category: "Mobile retail",
        description: "A smooth cross-platform shopping experience with complex state management.",
        image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 3,
        title: "Health & Fitness Tracker",
        category: "iOS / Android",
        description: "Interactive charts and real-time syncing for daily fitness routines.",
        image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 4,
        title: "Social Communications",
        category: "Flutter UI",
        description: "A comprehensive cross-platform messaging app with beautiful micro-animations.",
        image: "https://images.unsplash.com/photo-1616469829581-73993eb86b02?auto=format&fit=crop&q=80&w=800"
    },
];

export function Projects() {
    const containerRef = useRef<HTMLElement>(null);
    const isInView = useInView(containerRef, { margin: "-20%" }); // Trigger when 20% into the screen
    const lenis = useLenis();
    const hasScrolled = useRef(false);

    useEffect(() => {
        if (isInView && lenis && !hasScrolled.current) {
            hasScrolled.current = true;
            lenis.scrollTo(containerRef.current!, {
                duration: 1.5,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Expo ease out
                offset: 0,
            });
        }
    }, [isInView, lenis]);

    return (
        <section ref={containerRef} id="work" className="relative w-full min-h-screen bg-black/20 backdrop-blur-xl border-t border-white/5 py-32 px-6 md:px-12 z-20 overflow-hidden">
            <NeonWaves />

            <div className="relative max-w-7xl mx-auto z-10">
                <div className="mb-20">
                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Selected Works</h2>
                    <div className="w-full h-[1px] bg-white/10" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {projects.map((project, index) => (
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
                            key={project.id}
                            className={`group relative flex flex-col rounded-2xl p-8 overflow-hidden transition-all duration-500 hover:-translate-y-2 cursor-pointer border border-white/5 bg-white/[0.02] backdrop-blur-xl ${index % 2 !== 0 ? 'md:mt-24' : ''}`}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />

                            <div className="relative z-10 mb-8 aspect-video w-full rounded-xl bg-white/5 border border-white/10 overflow-hidden">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105"
                                />
                            </div>

                            <div className="relative z-10 flex-grow flex flex-col justify-end">
                                <span className="text-sm font-medium text-zinc-500 mb-2 uppercase tracking-wider">{project.category}</span>
                                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-500 transition-colors duration-300">
                                    {project.title}
                                </h3>
                                <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                                    {project.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
