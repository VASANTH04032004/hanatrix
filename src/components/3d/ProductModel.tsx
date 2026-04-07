"use client";

import { useFrame } from "@react-three/fiber";
import { Float, RoundedBox, Sphere, Cylinder, Text, Cone } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";

export type ToyType = "zuzu" | "emotion" | "rudy" | "ollie";

interface ProductModelProps {
    type: ToyType;
    position: [number, number, number];
    color: string;
}

export function ProductModel({ type, position, color }: ProductModelProps) {
    const groupRef = useRef<THREE.Group>(null);
    const [hovered, setHovered] = useState(false);

    useFrame((state) => {
        if (groupRef.current && hovered) {
            groupRef.current.rotation.y += 0.05;
            groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 5) * 0.1;
        } else if (groupRef.current) {
            // Simple idle
            groupRef.current.rotation.y += 0.005;
            groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.05;
        }
    });

    const renderModel = () => {
        switch (type) {
            case "zuzu":
                // Fox Dragon
                return (
                    <group>
                        <Float speed={2} floatIntensity={0.5}>
                            <RoundedBox args={[1.2, 0.8, 1]} radius={0.2} castShadow>
                                <meshStandardMaterial color="#7C3AED" roughness={0.4} />
                            </RoundedBox>
                            {/* Ears */}
                            <Cone args={[0.2, 0.5, 4]} position={[-0.4, 0.6, 0.2]} rotation={[0, 0, 0.2]}>
                                <meshStandardMaterial color="#7C3AED" />
                            </Cone>
                            <Cone args={[0.2, 0.5, 4]} position={[0.4, 0.6, 0.2]} rotation={[0, 0, -0.2]}>
                                <meshStandardMaterial color="#7C3AED" />
                            </Cone>
                            {/* Tail */}
                            <Cylinder args={[0.1, 0.3, 1]} position={[0, -0.2, -0.8]} rotation={[-Math.PI / 4, 0, 0]}>
                                <meshStandardMaterial color="#7C3AED" />
                            </Cylinder>
                        </Float>
                    </group>
                );
            case "emotion":
                // Emotion Builder
                return (
                    <group>
                        <Float speed={1.5} rotationIntensity={0.5}>
                            <RoundedBox args={[1, 1, 1]} radius={0.1} castShadow position={[-0.2, 0, 0]}>
                                <meshStandardMaterial color={color} />
                            </RoundedBox>
                            <Sphere args={[0.3, 16, 16]} position={[0.8, -0.2, 0.4]}>
                                <meshStandardMaterial color="#FBBF24" />
                            </Sphere>
                            <Cylinder args={[0.2, 0.2, 0.8]} position={[0.5, 0.4, -0.2]}>
                                <meshStandardMaterial color="#8B5CF6" />
                            </Cylinder>
                        </Float>
                    </group>
                );
            case "rudy":
                return (
                    <group>
                        <Float speed={2.5} rotationIntensity={0.2}>
                            <Cylinder args={[0.5, 0.6, 1.2, 16]} castShadow>
                                <meshStandardMaterial color={color} roughness={0.2} />
                            </Cylinder>
                            <Sphere args={[0.6, 32, 32]} position={[0, 0.8, 0]}>
                                <meshStandardMaterial color="#ffffff" opacity={0.8} transparent />
                            </Sphere>
                            <Sphere args={[0.2, 16, 16]} position={[0, 0.8, 0]}>
                                <meshStandardMaterial color={color} />
                            </Sphere>
                        </Float>
                    </group>
                );
            case "ollie":
                return (
                    <group>
                        <Float speed={2}>
                            <RoundedBox args={[1, 0.5, 0.8]} radius={0.2} castShadow position={[0, -0.2, 0]}>
                                <meshStandardMaterial color={color} />
                            </RoundedBox>
                            <Cylinder args={[0.2, 0.2, 0.1]} position={[-0.5, -0.4, 0.4]} rotation={[Math.PI / 2, 0, 0]}>
                                <meshStandardMaterial color="#333" />
                            </Cylinder>
                            <Cylinder args={[0.2, 0.2, 0.1]} position={[0.5, -0.4, 0.4]} rotation={[Math.PI / 2, 0, 0]}>
                                <meshStandardMaterial color="#333" />
                            </Cylinder>
                            <Cylinder args={[0.2, 0.2, 0.1]} position={[-0.5, -0.4, -0.4]} rotation={[Math.PI / 2, 0, 0]}>
                                <meshStandardMaterial color="#333" />
                            </Cylinder>
                            <Cylinder args={[0.2, 0.2, 0.1]} position={[0.5, -0.4, -0.4]} rotation={[Math.PI / 2, 0, 0]}>
                                <meshStandardMaterial color="#333" />
                            </Cylinder>
                        </Float>
                    </group>
                );
        }
    };

    return (
        <group
            ref={groupRef}
            position={position}
            onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer'; }}
            onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
        >
            {renderModel()}

            {hovered && (
                <group position={[0, 1.8, 0]}>
                    <Text
                        fontSize={0.2}
                        color="#333"
                        anchorX="center"
                        anchorY="middle"
                        font="/fonts/Fredoka-Bold.ttf"
                    >
                        Click to View!
                    </Text>
                </group>
            )}

            {/* Base platform */}
            <Cylinder args={[1.5, 1.6, 0.2, 32]} position={[0, -1, 0]} receiveShadow>
                <meshStandardMaterial color="#FCE7F3" roughness={0.1} metalness={0.1} />
            </Cylinder>
        </group>
    );
}
