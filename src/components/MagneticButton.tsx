"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    href?: string;
    target?: string;
    rel?: string;
}

export function MagneticButton({ children, className = "", href, target, rel, onClick }: MagneticButtonProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current!.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX * 0.3, y: middleY * 0.3 }); // 0.3 is the pull strength
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    const Component = href ? motion.a : motion.button;
    const props = href ? { href, target, rel } : { onClick };

    return (
        <div
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            className={`relative inline-block p-4 -m-4 ${className}`} // Padding increases magnetic area
        >
            <Component
                {...props}
                animate={{ x: position.x, y: position.y }}
                transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
                className="inline-block relative z-10"
            >
                {children}
            </Component>
        </div>
    );
}
