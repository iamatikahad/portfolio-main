"use client";

import { ReactLenis } from "lenis/react";
import { ReactNode } from "react";

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
    return (
        <ReactLenis
            root
            options={{
                lerp: 0.04, // Lower lerp means smoother and heavier scrolling
                duration: 2.5,
                smoothWheel: true,
                wheelMultiplier: 1.6, // Doubled scrolling speed
                touchMultiplier: 2.0,
            }}
        >
            {children}
        </ReactLenis>
    );
}
