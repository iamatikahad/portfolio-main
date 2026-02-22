"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent, motion } from "framer-motion";

export function ScrollytellingSection({ totalFrames = 75 }: { totalFrames?: number }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const currentIndex = useTransform(scrollYProgress, [0, 1], [0, Math.max(0, totalFrames - 1)]);
    const [images, setImages] = useState<HTMLImageElement[]>([]);

    // Section 1: 0% to 25%
    const opacity1 = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0]);
    const y1 = useTransform(scrollYProgress, [0, 0.25], ["0%", "-50%"]);

    // Section 2: 25% to 55%
    const opacity2 = useTransform(scrollYProgress, [0.2, 0.3, 0.45, 0.55], [0, 1, 1, 0]);
    const x2 = useTransform(scrollYProgress, [0.2, 0.55], ["-10%", "10%"]);

    // Section 3: 55% to 85%
    const opacity3 = useTransform(scrollYProgress, [0.5, 0.6, 0.75, 0.85], [0, 1, 1, 0]);
    const x3 = useTransform(scrollYProgress, [0.5, 0.85], ["10%", "-10%"]);

    // Preload images
    useEffect(() => {
        const loadedImages: HTMLImageElement[] = [];

        for (let i = 0; i < totalFrames; i++) {
            const img = new Image();
            const paddedIndex = i.toString().padStart(2, "0");
            img.src = `/sequence/frame_${paddedIndex}.png`;

            // Set up onload handlers during creation to avoid mutating state items later
            img.onload = () => {
                if (i === 0 && canvasRef.current) {
                    const canvas = canvasRef.current;
                    const ctx = canvas.getContext("2d");
                    drawCenteredImage(ctx, canvas, img);
                }
            };

            loadedImages.push(img);
        }

        setImages(loadedImages);
    }, [totalFrames]);

    // Initial Draw (Fallback if already loaded)
    useEffect(() => {
        if (images.length > 0 && canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
            const firstImage = images[0];

            if (firstImage.complete) {
                drawCenteredImage(ctx, canvas, firstImage);
            }
        }
    }, [images]);

    // Update Canvas on scroll
    useMotionValueEvent(currentIndex, "change", (latest) => {
        if (images.length === 0 || !canvasRef.current) return;

        const frameIndex = Math.min(
            totalFrames - 1,
            Math.max(0, Math.floor(latest))
        );
        const img = images[frameIndex];
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        if (img && img.complete) {
            requestAnimationFrame(() => drawCenteredImage(ctx, canvas, img));
        }
    });

    // Handle Resize
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current && images.length > 0) {
                const canvas = canvasRef.current;
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;

                const frameIndex = Math.floor(currentIndex.get());
                const img = images[frameIndex];
                if (img && img.complete) {
                    drawCenteredImage(canvas.getContext("2d"), canvas, img);
                }
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // trigger once to size it out

        return () => window.removeEventListener("resize", handleResize);
    }, [images, currentIndex]);

    return (
        <section ref={containerRef} className="relative w-full bg-black/10 backdrop-blur-sm" style={{ height: "500vh" }}>
            <div className="sticky top-0 w-full h-screen overflow-hidden">
                {/* Render Canvas below the overlay text */}
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full"
                />

                {/* Parallax Overlay Layers */}
                <div className="absolute inset-0 z-10 pointer-events-none">
                    {/* Section 1 */}
                    <motion.div
                        style={{ opacity: opacity1, y: y1 }}
                        className="absolute inset-0 flex flex-col items-center justify-center text-center p-8"
                    >
                        <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-white drop-shadow-2xl mb-4">
                            Atik Ahad
                        </h1>
                        <p className="text-xl md:text-4xl text-white/70 font-medium drop-shadow-md flex items-center gap-3 justify-center">
                            Ahad <span className="text-blue-400">&bull;</span> Odoo Developer
                        </p>
                    </motion.div>

                    {/* Section 2 */}
                    <motion.div
                        style={{ opacity: opacity2, x: x2 }}
                        className="absolute inset-0 flex flex-col items-start justify-center p-8 md:p-24"
                    >
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white max-w-2xl drop-shadow-2xl text-left">
                            I build pixel-perfect <br /><span className="text-blue-400">cross-platform apps.</span>
                        </h2>
                    </motion.div>

                    {/* Section 3 */}
                    <motion.div
                        style={{ opacity: opacity3, x: x3 }}
                        className="absolute inset-0 flex flex-col items-end justify-center p-8 md:p-24"
                    >
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white max-w-xl drop-shadow-2xl text-right">
                            Crafting fluid experiences <br /><span className="text-blue-400">with Flutter.</span>
                        </h2>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function drawCenteredImage(ctx: CanvasRenderingContext2D | null, canvas: HTMLCanvasElement, img: HTMLImageElement) {
    if (!ctx || !img) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = img.width;
    const imgHeight = img.height;

    const ratio = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
    const newWidth = imgWidth * ratio;
    const newHeight = imgHeight * ratio;

    const offsetX = (canvasWidth - newWidth) / 2;
    const offsetY = (canvasHeight - newHeight) / 2;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, 0, 0, imgWidth, imgHeight, offsetX, offsetY, newWidth, newHeight);
}
