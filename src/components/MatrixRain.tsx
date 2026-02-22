"use client";

import { useEffect, useRef } from "react";

const codeSnippets = ["0", "1"];

export function MatrixRain() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        const fontSize = 16;
        const columns = Math.max(Math.floor(width / fontSize), 1);

        // Y coordinate of each column
        const drops: number[] = [];
        // Random string for each column
        const strings: string[] = [];

        for (let x = 0; x < columns; x++) {
            drops[x] = Math.random() * -100; // Start off-screen
            strings[x] = getRandomSnippet();
        }

        function getRandomSnippet() {
            return codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        }

        function draw() {
            if (!ctx || !canvas) return;

            // Translucent black background to create tail effect
            ctx.fillStyle = "rgba(18, 18, 18, 0.1)"; // Match site background #121212
            ctx.fillRect(0, 0, width, height);

            ctx.fillStyle = "#3b82f6"; // Blue color to match branding
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = strings[i];

                // Randomly update the string sometimes for flicker effect
                if (Math.random() > 0.95) {
                    strings[i] = getRandomSnippet();
                }

                // Draw character
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                // Reset drop to top randomly
                if (drops[i] * fontSize > height && Math.random() > 0.975) {
                    drops[i] = 0;
                }

                drops[i] += 0.5; // Slower fall speed
            }
        }

        let animationId: number;
        let fpsInterval = 1000 / 30; // 30 FPS for performance
        let then = Date.now();
        let startTime = then;

        function animate() {
            animationId = requestAnimationFrame(animate);

            let now = Date.now();
            let elapsed = now - then;

            if (elapsed > fpsInterval) {
                then = now - (elapsed % fpsInterval);
                draw();
            }
        }

        animate();

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;

            const newColumns = Math.max(Math.floor(width / fontSize), 1);

            // Adjust drops array size
            if (newColumns > drops.length) {
                for (let i = drops.length; i < newColumns; i++) {
                    drops[i] = Math.random() * -100;
                    strings[i] = getRandomSnippet();
                }
            }
        };

        window.addEventListener("resize", handleResize);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full opacity-30 pointer-events-none"
            style={{ zIndex: 0 }}
        />
    );
}
