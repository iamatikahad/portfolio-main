"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

const links = [
    { label: "Home", href: "/", target: "_self" },
    { label: "Skills", href: "/skills", target: "_self" },
    { label: "Contact", href: "https://forms.gle/AwQcmw97KT9dTj4R9", target: "_blank" },
];

export function Navbar() {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;

        // Hide navbar when scrolling down, show when scrolling up
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
        // Add blur background when scrolled past top
        setScrolled(latest > 50);
    });

    return (
        <nav
            className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-300 w-[calc(100%-3rem)] max-w-5xl ${scrolled
                ? "top-6 py-3 px-6 rounded-full bg-white/[0.05] backdrop-blur-2xl border border-white/[0.1] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] saturate-[1.2]"
                : "top-6 py-3 px-6 rounded-full bg-white/[0.05] backdrop-blur-2xl border border-white/[0.1] shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] saturate-[1.2]"
                }`}
        >
            <div className="w-full flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm tracking-tighter" style={{ boxShadow: scrolled ? "0 0 15px rgba(59, 130, 246, 0.5)" : "none" }}>
                        Aa
                    </div>
                    <span className="font-semibold text-white tracking-widest text-sm uppercase">
                        Ahad.
                    </span>
                </Link>

                <ul className="hidden md:flex items-center gap-8">
                    {links.map((link) => (
                        <li key={link.label}>
                            {link.target === "_blank" ? (
                                <a
                                    href={link.href}
                                    target={link.target}
                                    rel="noopener noreferrer"
                                    className="text-sm font-medium text-zinc-300 hover:text-white transition-colors duration-200 uppercase tracking-widest"
                                >
                                    {link.label}
                                </a>
                            ) : (
                                <Link
                                    href={link.href}
                                    className="text-sm font-medium text-zinc-300 hover:text-white transition-colors duration-200 uppercase tracking-widest"
                                >
                                    {link.label}
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>

                <a
                    href="https://forms.gle/AwQcmw97KT9dTj4R9"
                    target="_blank"
                    rel="noreferrer"
                    className="md:hidden flex h-10 px-4 items-center justify-center rounded-full bg-white text-black text-xs font-bold uppercase tracking-widest"
                >
                    Chat
                </a>
            </div>
        </nav>
    );
}
