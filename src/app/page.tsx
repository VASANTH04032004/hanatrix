"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import ContactFooter from "@/components/ui/ContactFooter";
import StoryTimeline from "@/components/ui/StoryTimeline";

const HeroScene = dynamic(() => import("@/components/3d/HeroScene").then(mod => mod.HeroScene), { ssr: false, loading: () => <div className="w-full h-full flex items-center justify-center"><Loader2 className="animate-spin text-violet-primary w-12 h-12" /></div> });
const InteractiveToyWorld = dynamic(() => import("@/components/ui/InteractiveToyWorld"), { ssr: false });
const KidsFunZone = dynamic(() => import("@/components/ui/KidsFunZone"), { ssr: false });
const Gallery3D = dynamic(() => import("@/components/ui/Gallery3D"), { ssr: false });

export default function Home() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between overflow-x-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative w-full h-[100svh] flex flex-col items-center justify-center pt-20" id="hero">
        <div className="absolute inset-0 z-0 pointer-events-auto">
          <HeroScene />
        </div>

        {/* Hero Content Overlay */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 max-w-4xl mx-auto pointer-events-none mb-20">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display font-bold text-5xl sm:text-6xl md:text-8xl lg:text-[7rem] tracking-tight text-dark-text mb-6 drop-shadow-sm leading-tight">
            <span className="text-purple-300">Enter the</span> <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-deep via-violet-primary to-violet-light animate-gradient-x bg-[length:200%_auto]">
              Magic Toy Universe
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-dark-muted mb-10 max-w-2xl font-medium drop-shadow-sm bg-white/40 md:bg-transparent p-4 md:p-0 rounded-2xl backdrop-blur-sm md:backdrop-blur-none border border-white/50 md:border-none">
            Discover our magical collection of toys that inspires creativity, learning, peace and endless fun for all ages.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="pointer-events-auto"
          >
            <Link href="#toy-world" className="group bg-white/80 backdrop-blur-md border-4 border-violet-primary hover:border-violet-light text-dark-text px-8 py-5 rounded-full font-bold text-xl md:text-2xl transition-all transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-violet-primary/30 active:translate-y-0 flex items-center gap-4">
              Explore the Toy World
              <span className="w-10 h-10 bg-violet-primary group-hover:bg-violet-deep text-white rounded-full flex items-center justify-center transition-all duration-300 group-hover:translate-x-2">
                <span className="inline-block transform rotate-90">↑</span>
              </span>
            </Link>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce flex flex-col items-center text-violet-primary/60 font-bold tracking-widest uppercase text-sm z-10">
          Scroll
          <div className="w-6 h-10 border-2 border-violet-light rounded-full mt-2 flex justify-center p-1">
            <div className="w-1.5 h-3 bg-violet-primary/50 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* 2. INTERACTIVE TOY WORLD */}
      <section id="toy-world" className="w-full">
        <InteractiveToyWorld />
      </section>

      {/* 4. KIDS FUN ZONE */}
      <section id="fun-zone" className="w-full">
        <KidsFunZone />
      </section>

      {/* 5. STORY TIMELINE */}
      <section id="story" className="w-full">
        <StoryTimeline />
      </section>

      {/* 6. GALLERY 3D */}
      <section id="gallery" className="w-full">
        <Gallery3D />
      </section>

      {/* 7. CONTACT & FOOTER */}
      <ContactFooter />
    </main>
  );
}
