import { ScrollytellingSection } from "@/components/ScrollytellingSection";
import { Projects } from "@/components/Projects";
import { Contact } from "@/components/Contact";
import { Navbar } from "@/components/Navbar";
import { IslamicQuote } from "@/components/IslamicQuote";
import { PrayerTimes } from "@/components/PrayerTimes";

import { Preloader } from "@/components/Preloader";

export default function Home() {
  return (
    <main className="w-full bg-[#121212]">
      <Preloader />
      <Navbar />

      {/* 
        Scrollable Canvas Section 
        This is our 500vh Scrollytelling sticky header
      */}
      <ScrollytellingSection totalFrames={75} />

      {/* 
        Below the fold content 
      */}
      <Projects />

      {/* Daily Motivational Quote */}
      <IslamicQuote />

      {/* Prayer Times Section for BG Time */}
      <PrayerTimes />

      {/* 
        Footer / Contact
      */}
      <div id="contact">
        <Contact />
      </div>
    </main>
  );
}
