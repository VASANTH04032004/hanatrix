"use client";

import { useState, Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows, PresentationControls, Sparkles } from "@react-three/drei";
import { ProductModel, ToyType } from "@/components/3d/ProductModel";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import clsx from "clsx";

const products = [
    {
        id: "zuzu",
        name: "Zuzu",
        type: "zuzu" as ToyType,
        color: "#9333EA", // purple-600
        description: "A fox dragon designed for serene, weighted calm and protective companion.",
        price: "Coming Soon",
    },
    {
        id: "emotion",
        name: "Emotion Builder",
        type: "emotion" as ToyType,
        color: "#A855F7", // purple-500
        description: "An emotional puzzle game helps players develop emotional literacy by matching feelings.",
        price: "Coming Soon",
    },
    {
        id: "rudy",
        name: "Rudy",
        type: "rudy" as ToyType,
        color: "#C4B5FD", // violet-light
        description: "A friendly space explorer coming soon to fuel intergalactic adventures.",
        price: "Coming Soon",
    },
    {
        id: "ollie",
        name: "Ollie",
        type: "ollie" as ToyType,
        color: "#FBBF24", // gold-primary
        description: "A speedy, playful companion coming soon to zoom into your heart.",
        price: "Coming Soon",
    },
];

export default function InteractiveToyWorld() {
    const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
    const [container, setContainer] = useState<HTMLElement | null>(null);

    return (
        <div ref={setContainer as any} className="w-full relative py-20 bg-dark-bg overflow-hidden" id="toy-world">
            {/* Decorative background blobs */}
            <div className="absolute top-20 left-10 w-64 h-64 bg-violet-primary/10 rounded-full mix-blend-screen filter blur-3xl opacity-70 animate-blob"></div>
            <div className="absolute top-40 right-10 w-72 h-72 bg-violet-medium/10 rounded-full mix-blend-screen filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-1/2 w-80 h-80 bg-violet-deep/10 rounded-full mix-blend-screen filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>

            <div className="max-w-7xl mx-auto px-4 z-10 relative">
                <div className="text-center mb-16">
                    <h2 className="font-display text-5xl font-bold text-dark-text mb-4">
                        Interactive Toy World
                    </h2>
                    <p className="text-xl text-dark-muted max-w-2xl mx-auto">
                        Hover over our magical toys to see them come alive, and click to explore their stories.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 h-[500px]">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="relative rounded-3xl bg-dark-surface/50 backdrop-blur-md shadow-xl border border-dark-border cursor-pointer overflow-hidden group transition-all duration-300 hover:shadow-violet-primary/30 hover:shadow-2xl hover:-translate-y-2 hover:bg-dark-surface/80"
                            onClick={() => setSelectedProduct(product)}
                        >
                            <div className="absolute inset-0 w-full h-full pointer-events-none">
                                {container && <Canvas eventSource={container} camera={{ position: [0, 0, 5], fov: 40 }} dpr={[1, 2]}>
                                    <ambientLight intensity={0.5} />
                                    <directionalLight position={[10, 10, 5]} intensity={1.5} />
                                    <PresentationControls
                                        rotation={[0, 0, 0]}
                                        polar={[-Math.PI / 4, Math.PI / 4]}
                                        azimuth={[-Math.PI / 4, Math.PI / 4]}
                                    >
                                        <Suspense fallback={null}>
                                            <ProductModel type={product.type} position={[0, -0.5, 0]} color={product.color} />
                                            <Sparkles count={50} scale={3} size={2} speed={0.4} opacity={0.5} color={product.color} />
                                        </Suspense>
                                    </PresentationControls>
                                    <Environment preset="city" />
                                </Canvas>}
                            </div>

                            <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-dark-surface via-dark-surface/80 to-transparent pointer-events-none transform translate-y-4 group-hover:translate-y-0 transition-transform">
                                <h3 className="font-display font-bold text-2xl text-dark-text">{product.name}</h3>
                                <p className="text-sm font-medium text-dark-text/80 mt-1">{product.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Product Modal */}
            <AnimatePresence>
                {selectedProduct && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-dark-bg/60 backdrop-blur-md"
                        onClick={() => setSelectedProduct(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            className="bg-dark-surface border border-dark-border rounded-3xl shadow-2xl shadow-violet-primary/20 overflow-hidden max-w-4xl w-full flex flex-col md:flex-row relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className="absolute top-4 right-4 z-10 w-10 h-10 bg-dark-bg border border-dark-border rounded-full flex items-center justify-center text-dark-muted hover:bg-violet-primary hover:text-white transition-colors"
                                onClick={() => setSelectedProduct(null)}
                            >
                                <X size={24} />
                            </button>

                            <div className="w-full md:w-1/2 h-80 md:h-[500px] bg-dark-surface relative border-none border-0">
                                {container && <Canvas eventSource={container} camera={{ position: [0, 0, 8], fov: 40 }} dpr={[1, 2]}>
                                    <ambientLight intensity={0.7} />
                                    <directionalLight position={[10, 10, 10]} intensity={1.5} />
                                    <PresentationControls
                                        rotation={[0, 0.5, 0]}
                                    >
                                        <Suspense fallback={null}>
                                            <ProductModel type={selectedProduct.type} position={[0, 0, 0]} color={selectedProduct.color} />
                                        </Suspense>
                                    </PresentationControls>
                                    <ContactShadows position={[0, -2, 0]} opacity={0.6} scale={10} blur={2} />
                                    <Environment preset="city" />
                                </Canvas>}
                            </div>

                            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                                <div
                                    className="w-16 h-16 rounded-2xl mb-6 shadow-inner flex items-center justify-center"
                                    style={{ backgroundColor: `${selectedProduct.color}20`, color: selectedProduct.color }}
                                >
                                    <span className="font-display font-bold text-3xl">{selectedProduct.name[0]}</span>
                                </div>

                                <h3 className="font-display font-bold text-4xl text-dark-text mb-4">
                                    {selectedProduct.name}
                                </h3>

                                <p className="text-xl text-dark-text/80 mb-8 leading-relaxed">
                                    {selectedProduct.description}
                                </p>

                                <div className="flex items-center justify-between mb-8">
                                    <span className="text-3xl font-display font-bold text-dark-text">{selectedProduct.price}</span>
                                    <span className="px-4 text-sm py-1 bg-green-100 text-green-700 font-medium rounded-full">In Stock Soon</span>
                                </div>

                                <button
                                    className={clsx(
                                        "w-full py-4 rounded-xl font-bold text-lg text-white transition-all transform hover:-translate-y-1 hover:shadow-lg hover:shadow-violet-primary/30 active:translate-y-0",
                                        "bg-gradient-to-r from-violet-primary to-violet-deep"
                                    )}
                                >
                                    Notify Me When Available
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
