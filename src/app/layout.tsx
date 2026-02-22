import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Creative Developer Portfolio",
  description: "High-end Scrollytelling Personal Portfolio",
};

import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { CustomCursor } from "@/components/CustomCursor";
import { SurpriseMe } from "@/components/SurpriseMe";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={`${inter.variable} font-sans antialiased text-white bg-[#0a0a0a] overflow-x-hidden min-h-screen relative selection:bg-indigo-500/30`}>
        {/* Global Ambient Glass Background */}
        <div className="fixed inset-0 z[-1] pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600/20 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[40%] rounded-full bg-violet-600/20 blur-[120px]" />
          <div className="absolute top-[40%] left-[60%] w-[20%] h-[20%] rounded-full bg-blue-500/10 blur-[100px]" />
        </div>

        <SmoothScrollProvider>
          <CustomCursor />
          <SurpriseMe />
          <div className="relative z-0">
            {children}
          </div>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
