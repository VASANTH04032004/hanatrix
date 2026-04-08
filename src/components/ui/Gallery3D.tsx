"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, PresentationControls, RoundedBox, Float, Text, Cylinder } from "@react-three/drei";
import { useState } from "react";
import { ProductModel } from "@/components/3d/ProductModel";

function ShelfItem({ position, children }: { position: [number, number, number], children: React.ReactNode }) {
    const [hovered, setHovered] = useState(false);

    return (
        <group
            position={position}
            onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer'; }}
            onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
        >
            <Float speed={hovered ? 5 : 2} floatIntensity={hovered ? 2 : 0.5}>
                {children}
            </Float>
        </group>
    );
}

export default function Gallery3D() {
    const [container, setContainer] = useState<HTMLElement | null>(null);
    return (
        <div className="w-full relative py-20 bg-dark-bg overflow-hidden" id="gallery">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-violet-deep/30 via-dark-bg to-dark-bg"></div>

            <div className="max-w-7xl mx-auto px-4 z-10 relative mb-12">
                <div className="text-center">
                    <h2 className="font-display text-5xl font-bold text-dark-text mb-4">
                        Toy Gallery
                    </h2>
                    <p className="text-xl text-dark-muted max-w-2xl mx-auto">
                        Drag to rotate and explore our collection of magical creations.
                    </p>
                </div>
            </div>

            <div ref={(node) => setContainer(node)} className="w-full h-[600px] relative mt-10">
                {container && (
                <Canvas eventSource={container} camera={{ position: [0, 2, 8], fov: 45 }} dpr={[1, 2]}>
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[10, 10, 5]} intensity={1} />

                    <PresentationControls
                        rotation={[0, 0, 0]}
                        polar={[-Math.PI / 6, Math.PI / 6]}
                        azimuth={[-Math.PI, Math.PI]}
                    >
                        <group position={[0, -1, 0]}>
                            {/* Central Display Structure */}
                            <Cylinder args={[3, 3.2, 0.5, 32]} position={[0, -0.25, 0]}>
                                <meshStandardMaterial color="#FBCFE8" roughness={0.2} metalness={0.1} />
                            </Cylinder>
                            <Cylinder args={[2, 2.2, 0.5, 32]} position={[0, 1, 0]}>
                                <meshStandardMaterial color="#F9A8D4" roughness={0.2} metalness={0.1} />
                            </Cylinder>
                            <Cylinder args={[1, 1.2, 0.5, 32]} position={[0, 2.25, 0]}>
                                <meshStandardMaterial color="#F472B6" roughness={0.2} metalness={0.1} />
                            </Cylinder>

                            {/* Items Bottom Tier */}
                            <ShelfItem position={[-2, 0.5, 2]}>
                                <ProductModel type="zuzu" position={[0, 0, 0]} color="#9333EA" />
                            </ShelfItem>
                            <ShelfItem position={[2, 0.5, 2]}>
                                <ProductModel type="emotion" position={[0, 0, 0]} color="#C4B5FD" />
                            </ShelfItem>
                            <ShelfItem position={[2, 0.5, -2]}>
                                <ProductModel type="rudy" position={[0, 0, 0]} color="#A855F7" />
                            </ShelfItem>
                            <ShelfItem position={[-2, 0.5, -2]}>
                                <ProductModel type="ollie" position={[0, 0, 0]} color="#FBBF24" />
                            </ShelfItem>

                            {/* Items Middle Tier */}
                            <ShelfItem position={[-1.2, 1.7, 1.2]}>
                                <RoundedBox args={[0.5, 0.5, 0.5]} radius={0.1}>
                                    <meshStandardMaterial color="#7C3AED" />
                                </RoundedBox>
                            </ShelfItem>
                            <ShelfItem position={[1.2, 1.7, 1.2]}>
                                <RoundedBox args={[0.5, 0.5, 0.5]} radius={0.1}>
                                    <meshStandardMaterial color="#C4B5FD" />
                                </RoundedBox>
                            </ShelfItem>
                            <ShelfItem position={[1.2, 1.7, -1.2]}>
                                <RoundedBox args={[0.5, 0.5, 0.5]} radius={0.1}>
                                    <meshStandardMaterial color="#FBBF24" />
                                </RoundedBox>
                            </ShelfItem>
                            <ShelfItem position={[-1.2, 1.7, -1.2]}>
                                <RoundedBox args={[0.5, 0.5, 0.5]} radius={0.1}>
                                    <meshStandardMaterial color="#A855F7" />
                                </RoundedBox>
                            </ShelfItem>

                            {/* Top Tier Element */}
                            <group position={[0, 3.5, 0]}>
                                <Float speed={4} rotationIntensity={2}>
                                    <Text
                                        fontSize={1}
                                        color="#FFD24B"
                                        font="/fonts/Fredoka-Bold.ttf"
                                        anchorX="center"
                                        anchorY="middle"
                                    >
                                        M A G I C
                                    </Text>
                                </Float>
                            </group>

                        </group>
                    </PresentationControls>

                    <Environment preset="city" />
                </Canvas>
                )}
            </div>
        </div>
    );
}
