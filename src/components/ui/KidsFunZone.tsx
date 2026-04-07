"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Star, Circle, Triangle, Square } from "lucide-react";
import clsx from "clsx";

type GameObject = {
    id: number;
    type: 'balloon' | 'star' | 'cube';
    x: number;
    y: number;
    color: string;
    speed: number;
};


const bgColors = [
    "bg-violet-primary",
    "bg-violet-medium",
    "bg-violet-deep",
    "bg-violet-light",
    "bg-gold-primary",
    "bg-[#3B0764]",
];

export default function KidsFunZone() {
    const [score, setScore] = useState(0);
    const [objects, setObjects] = useState<GameObject[]>([]);
    const [isPlaying, setIsPlaying] = useState(false);

    // Game loop
    useEffect(() => {
        if (!isPlaying) return;

        const interval = setInterval(() => {
            setObjects((prev) => {
                // Move existing objects up
                const moved = prev
                    .map((obj) => ({ ...obj, y: obj.y - obj.speed }))
                    .filter((obj) => obj.y > -20); // Remove if off top screen

                // Randomly add new object
                if (Math.random() > 0.6) {
                    moved.push({
                        id: Date.now() + Math.random(),
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        type: ['balloon', 'star', 'cube'][Math.floor(Math.random() * 3)] as any,
                        x: Math.random() * 80 + 10, // 10% to 90% width
                        y: 110, // Start below screen
                        color: Math.floor(Math.random() * 6).toString(),
                        speed: Math.random() * 1 + 0.5,
                    });
                }
                return moved;
            });
        }, 50);

        return () => clearInterval(interval);
    }, [isPlaying]);

    const handlePop = (id: number, x: number, y: number, event: React.MouseEvent) => {
        // Play sound or effect here if desired
        setObjects((prev) => prev.filter((obj) => obj.id !== id));
        setScore((s) => s + 10);

        // Confetti explosion at cursor
        const xRatio = (event.clientX) / window.innerWidth;
        const yRatio = (event.clientY) / window.innerHeight;

        confetti({
            particleCount: 30,
            spread: 60,
            origin: { x: xRatio, y: yRatio },
            colors: ['#FF4B4B', '#4BA3FF', '#FFD24B', '#4BFF81'],
            disableForReducedMotion: true,
            zIndex: 100,
        });
    };

    return (
        <div className="w-full relative py-20 bg-gradient-to-b from-dark-bg to-white/50 overflow-hidden" id="fun-zone">
            <div className="max-w-7xl mx-auto px-4 z-10 relative">
                <div className="text-center mb-12">
                    <h2 className="font-display text-5xl font-bold text-dark-text mb-4 inline-flex items-center gap-4">
                        <Star className="text-violet-medium fill-violet-medium animate-spin-slow" size={40} />
                        Kids Fun Zone
                        <Star className="text-violet-medium fill-violet-medium animate-spin-slow" size={40} />
                    </h2>
                    <p className="text-xl text-dark-muted max-w-2xl mx-auto mb-8">
                        Pop the balloons, catch the stars, and collect points! A safe, interactive playground for little ones.
                    </p>

                    {!isPlaying ? (
                        <button
                            onClick={() => setIsPlaying(true)}
                            className="bg-violet-primary hover:bg-violet-deep text-white px-8 py-4 rounded-full font-bold text-xl transition-all transform hover:scale-110 active:scale-95 shadow-lg shadow-violet-primary/30"
                        >
                            Start Playing!
                        </button>
                    ) : (
                        <div className="flex items-center justify-center gap-8">
                            <div className="bg-white/80 border-4 border-violet-light px-6 py-2 rounded-2xl shadow-md">
                                <span className="font-display font-bold text-2xl text-dark-text">Score: {score}</span>
                            </div>
                            <button
                                onClick={() => { setIsPlaying(false); setObjects([]); setScore(0); }}
                                className="text-dark-muted hover:text-violet-primary font-medium underline"
                            >
                                Stop Game
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Game Area */}
            <div className="relative w-full h-[500px] border-y-4 border-dashed border-violet-light/50 bg-white/40 backdrop-blur-md overflow-hidden rounded-[3rem] mx-4 md:mx-auto max-w-6xl shadow-inner cursor-crosshair">

                {!isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-50">
                        <div className="flex gap-4 animate-pulse">
                            <Circle className="text-toy-red" size={64} />
                            <Triangle className="text-toy-blue" size={64} />
                            <Square className="text-toy-yellow" size={64} />
                        </div>
                    </div>
                )}

                <AnimatePresence>
                    {objects.map((obj) => (
                        <motion.div
                            key={obj.id}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            style={{
                                position: 'absolute',
                                left: `${obj.x}%`,
                                top: `${obj.y}%`,
                                cursor: 'pointer',
                            }}
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            onPointerDown={(e) => handlePop(obj.id, obj.x, obj.y, e as any)}
                            className={clsx(
                                "flex items-center justify-center rounded-full shadow-lg transform active:scale-90 transition-transform",
                                bgColors[parseInt(obj.color)]
                            )}
                        >
                            {obj.type === 'balloon' && (
                                <div className="w-16 h-20 rounded-[50%] flex items-center justify-center">
                                    <div className="w-2 h-2 bg-white/40 rounded-full absolute top-4 left-4"></div>
                                    <div className="w-1 h-4 bg-gray-300 absolute -bottom-4"></div>
                                </div>
                            )}
                            {obj.type === 'star' && (
                                <div className="w-16 h-16 flex items-center justify-center">
                                    <Star className="text-white fill-white" size={40} />
                                </div>
                            )}
                            {obj.type === 'cube' && (
                                <div className="w-16 h-16 rounded-xl flex items-center justify-center">
                                    <div className="w-4 h-4 bg-white/40 rounded-sm absolute top-2 left-2"></div>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}
