"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Contact } from "@/components/Contact";

const flutterSkills = [
    { name: "Django Framework", value: 95 },
    { name: "Python", value: 90 },
    { name: "State Management (Provider/Riverpod)", value: 85 },
    { name: "Firebase Integration", value: 80 },
    { name: "Custom Animations", value: 85 },
    { name: "RESTful APIs", value: 90 },
];

const designSkills = [
    { name: "UI/UX Design", value: 85 },
    { name: "Figma", value: 90 },
    { name: "Adobe Illustrator", value: 80 },
    { name: "Adobe Photoshop", value: 75 },
    { name: "Wireframing & Prototyping", value: 85 },
];

export default function SkillsPage() {
    return (
        <main className="w-full min-h-screen bg-[#121212] pt-32 pb-16 px-6 md:px-12 flex flex-col">
            <Navbar />

            <div className="max-w-4xl mx-auto w-full flex-grow relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="mb-20 text-center md:text-left"
                >
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                        My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Arsenal</span>
                    </h1>
                    <p className="text-xl text-zinc-400 max-w-2xl">
                        A breakdown of my technical expertise in Odoo ERP development and customization.
I focus on building scalable, efficient, and fully integrated business solutions using Odoo.</p>
                </motion.div>

                <div className="flex flex-col md:flex-row gap-16 md:gap-24 w-full">
                    {/* Flutter Core */}
                    <div className="flex-1 w-full">
                        <h2 className="text-2xl font-semibold text-white mb-8 border-b border-white/10 pb-4 uppercase tracking-widest text-blue-400">
                            Engineering
                        </h2>
                        <div className="flex flex-col gap-8">
                            {flutterSkills.map((skill, index) => (
                                <SkillBar key={skill.name} name={skill.name} value={skill.value} delay={index * 0.1} color="bg-blue-500" />
                            ))}
                        </div>
                    </div>

                    {/* Design Core */}
                    <div className="flex-1 w-full">
                        <h2 className="text-2xl font-semibold text-white mb-8 border-b border-white/10 pb-4 uppercase tracking-widest text-purple-400">
                            Design
                        </h2>
                        <div className="flex flex-col gap-8">
                            {designSkills.map((skill, index) => (
                                <SkillBar key={skill.name} name={skill.name} value={skill.value} delay={index * 0.1} color="bg-purple-500" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-32">
                <Contact />
            </div>
        </main>
    );
}

function SkillBar({ name, value, delay, color }: { name: string; value: number; delay: number; color: string }) {
    return (
        <div className="w-full flex flex-col gap-2">
            <div className="flex justify-between items-end">
                <span className="text-zinc-300 font-medium">{name}</span>
                <span className="text-zinc-500 text-sm font-mono">{value}%</span>
            </div>
            <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${value}%` }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 1, delay, ease: "easeOut" }}
                    className={`h-full rounded-full ${color}`}
                />
            </div>
        </div>
    );
}
