"use client";

import { motion } from "framer-motion";
import { MatrixRain } from "@/components/MatrixRain";
import { MagneticButton } from "@/components/MagneticButton";

export function Contact() {
    return (
        <section className="relative w-full min-h-[20vh] bg-black/40 backdrop-blur-2xl py-8 px-6 md:px-12 z-20 flex flex-col items-center justify-center border-t border-white/10 overflow-hidden shadow-[0_-20px_40px_rgba(0,0,0,0.3)]">
            <MatrixRain />
            <div className="max-w-4xl mx-auto text-center relative z-10 w-full flex flex-col items-center">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="text-2xl md:text-4xl font-bold text-white mb-2"
                >
                    Let&apos;s build something together.
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="text-base text-zinc-400 mb-6 max-w-2xl mx-auto"
                >
                    I&apos;m currently available for new projects.
                </motion.p>

                <MagneticButton
                    href="https://forms.gle/F9VMEYGJ99J779Ef8"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="inline-block bg-white text-black font-semibold text-sm px-5 py-2.5 rounded-full hover:scale-105 transition-transform duration-300 relative overflow-hidden group mb-6"
                    >
                        <span className="relative z-10">Say Hello</span>
                        <div className="absolute inset-0 bg-zinc-200 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                    </motion.div>
                </MagneticButton>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between w-full max-w-3xl gap-4"
                >
                    <p className="text-zinc-500 text-xs">© {new Date().getFullYear()}AtikAhad — All Rights Reserved |
Powered by Kignature LLC</p>

                    <div className="flex items-center gap-2">
                        <SocialLink href="https://github.com/iamatikahad" label="GitHub" />
                        <SocialLink href="https://www.linkedin.com/in/iamatikahad/" label="LinkedIn" />
                        <SocialLink href="https://www.facebook.com/iamatikahad" label="Facebook" />
                        <SocialLink href="https://www.instagram.com/iamatikahad/" label="Instagram" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

function SocialLink({ href, label }: { href: string; label: string }) {
    return (
        <MagneticButton href={href} target="_blank" rel="noreferrer">
            <span
                className="text-zinc-400 hover:text-white transition-colors duration-200 text-sm font-medium uppercase tracking-wider block p-2"
            >
                {label}
            </span>
        </MagneticButton>
    );
}
