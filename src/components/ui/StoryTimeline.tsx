"use client";

import { useRef } from "react";
import { useScroll, motion, useTransform } from "framer-motion";

const timelineEvents = [
    {
        year: "Our Vision",
        title: "The Spark of Magic",
        description: "It all started with a simple idea: toys shouldn't just be plastic objects, they should be companions that nurture emotional growth and creativity.",
        color: "bg-violet-primary",
        icon: "✨",
    },
    {
        year: "Designing",
        title: "Crafting Characters",
        description: "Every curve, every color, and every texture is carefully chosen to create characters like Zuzu and Ollie that children instinctively connect with.",
        color: "bg-violet-medium",
        icon: "✏️",
    },
    {
        year: "Building",
        title: "Bringing to Life",
        description: "Using safe, sustainable materials, our magical factory transforms sketches into tangible friends ready for their first hug.",
        color: "bg-gold-primary",
        icon: "🏭",
    },
    {
        year: "The Future",
        title: "Worldwide Wonders",
        description: "Connecting elegant souls to the future through magical experiences, reaching children and families across the globe.",
        color: "bg-violet-deep",
        icon: "🌍",
    },
];

export default function StoryTimeline() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section id="story" className="py-32 bg-dark-bg relative overflow-hidden" ref={containerRef}>
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-sky-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 mix-blend-multiply opacity-60 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 mix-blend-multiply opacity-60 pointer-events-none"></div>

            <div className="max-w-4xl mx-auto px-6 relative z-10">
                <div className="text-center mb-20">
                    <h2 className="font-display text-5xl font-bold text-dark-text mb-6">
                        <span className="text-purple-300">The Hanatrix Story</span>
                    </h2>
                    <p className="text-xl text-dark-muted">
                        How we weave magic, imagination, and care into every toy we create.
                    </p>
                </div>

                <div className="relative">
                    {/* Animated vertical line */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-dark-border -translate-x-1/2 rounded-full overflow-hidden">
                        <motion.div
                            className="w-full bg-gradient-to-b from-violet-primary via-gold-primary to-violet-medium origin-top"
                            style={{ height: lineHeight }}
                        />
                    </div>

                    <div className="space-y-24">
                        {timelineEvents.map((event, index) => {
                            const isEven = index % 2 === 0;
                            return (
                                <div key={index} className="relative flex flex-col md:flex-row items-center">

                                    {/* Timeline Node */}
                                    <div className="absolute left-8 md:left-1/2 w-16 h-16 rounded-full border-4 border-dark-border shadow-xl flex items-center justify-center text-2xl -translate-x-1/2 z-10 bg-dark-surface group hover:scale-110 transition-transform">
                                        <span className="relative z-10">{event.icon}</span>
                                        <div className={`absolute inset-0 ${event.color} opacity-20 rounded-full group-hover:opacity-40 transition-opacity`}></div>
                                    </div>

                                    {/* Content Desktop Layout */}
                                    <div className={`hidden md:block w-1/2 ${isEven ? 'pr-16 text-right' : 'pl-16 ml-auto text-left'}`}>
                                        <motion.div
                                            initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true, margin: "-100px" }}
                                            transition={{ duration: 0.8, type: "spring" }}
                                            className="bg-dark-surface p-8 rounded-3xl shadow-lg border border-dark-border hover:shadow-violet-primary/20 transition-all group"
                                        >
                                            <span className={`inline-block px-4 py-1 rounded-full text-sm font-bold text-white mb-4 ${event.color} bg-opacity-90`}>
                                                {event.year}
                                            </span>
                                            <h3 className="font-display text-3xl font-bold text-dark-text mb-4 group-hover:text-violet-primary transition-colors">
                                                {event.title}
                                            </h3>
                                            <p className="text-dark-muted leading-relaxed text-lg">
                                                {event.description}
                                            </p>
                                        </motion.div>
                                    </div>

                                    {/* Content Mobile Layout */}
                                    <div className="md:hidden w-full pl-24 pr-4 py-4">
                                        <motion.div
                                            initial={{ opacity: 0, x: 50 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true, margin: "-50px" }}
                                            transition={{ duration: 0.5 }}
                                            className="bg-dark-surface p-6 rounded-2xl shadow-lg border border-dark-border relative overflow-hidden"
                                        >
                                            <div className={`absolute top-0 left-0 w-2 h-full ${event.color}`}></div>
                                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white mb-3 ${event.color}`}>
                                                {event.year}
                                            </span>
                                            <h3 className="font-display text-xl font-bold text-dark-text mb-2">
                                                {event.title}
                                            </h3>
                                            <p className="text-dark-muted text-sm leading-relaxed">
                                                {event.description}
                                            </p>
                                        </motion.div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
