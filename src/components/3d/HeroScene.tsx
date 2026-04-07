"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, PresentationControls, ContactShadows, RoundedBox, Sphere, Cylinder } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";

// Stylized Toy Elements since we don't have custom models

function BouncingCube({ position, color, delay = 0 }: { position: [number, number, number], color: string, delay?: number }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            const time = state.clock.getElapsedTime();
            meshRef.current.position.y = position[1] + Math.sin(time * 3 + delay) * 0.5;
            meshRef.current.rotation.x = Math.sin(time) * 0.2;
            meshRef.current.rotation.y += 0.01;
        }
    });

    return (
        <RoundedBox ref={meshRef} position={position} args={[1, 1, 1]} radius={0.2} smoothness={4} castShadow>
            <meshStandardMaterial color={color} roughness={0.2} metalness={0.1} />
        </RoundedBox>
    );
}

function FloatingBalloon({ position, color, delay = 0 }: { position: [number, number, number], color: string, delay?: number }) {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            const time = state.clock.getElapsedTime();
            groupRef.current.position.y = position[1] + Math.sin(time + delay) * 1.5;
            groupRef.current.rotation.z = Math.sin(time * 0.5 + delay) * 0.1;
        }
    });

    return (
        <group ref={groupRef} position={position}>
            <Sphere args={[0.5, 32, 32]} position={[0, 0, 0]} castShadow>
                <meshPhysicalMaterial color={color} roughness={0.1} transmission={0.2} thickness={0.5} />
            </Sphere>
            <Cylinder args={[0.02, 0.02, 2, 8]} position={[0, -1.2, 0]}>
                <meshStandardMaterial color="#dddddd" />
            </Cylinder>
        </group>
    );
}

function ToyRobot({ position }: { position: [number, number, number] }) {
    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1} position={position}>
            <group>
                {/* Head */}
                <RoundedBox args={[0.8, 0.8, 0.8]} radius={0.1} position={[0, 1.2, 0]} castShadow>
                    <meshStandardMaterial color="#7C3AED" roughness={0.3} />
                </RoundedBox>
                {/* Eyes */}
                <Sphere args={[0.1, 16, 16]} position={[-0.2, 1.3, 0.4]}>
                    <meshBasicMaterial color="white" />
                </Sphere>
                <Sphere args={[0.1, 16, 16]} position={[0.2, 1.3, 0.4]}>
                    <meshBasicMaterial color="white" />
                </Sphere>
                {/* Body */}
                <RoundedBox args={[1, 1.2, 0.8]} radius={0.1} position={[0, 0, 0]} castShadow>
                    <meshStandardMaterial color="#8B5CF6" roughness={0.3} />
                </RoundedBox>
                {/* Antenna */}
                <Cylinder args={[0.05, 0.05, 0.5]} position={[0, 1.8, 0]}>
                    <meshStandardMaterial color="#FBBF24" />
                </Cylinder>
                <Sphere args={[0.15, 16, 16]} position={[0, 2.1, 0]}>
                    <meshStandardMaterial color="#FBBF24" emissive="#FBBF24" emissiveIntensity={0.5} />
                </Sphere>
            </group>
        </Float>
    );
}

function ToyTrain({ position }: { position: [number, number, number] }) {
    const trainRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (trainRef.current) {
            const time = state.clock.getElapsedTime();
            // Move in a circle
            trainRef.current.position.x = position[0] + Math.cos(time * 0.5) * 4;
            trainRef.current.position.z = position[2] + Math.sin(time * 0.5) * 4;
            trainRef.current.rotation.y = -time * 0.5;
        }
    });

    return (
        <group ref={trainRef}>
            <RoundedBox args={[1.5, 1, 0.8]} radius={0.1} position={[0, 0.5, 0]} castShadow>
                <meshStandardMaterial color="#5B21B6" roughness={0.2} />
            </RoundedBox>
            <Cylinder args={[0.3, 0.3, 0.8]} position={[0.4, 1.2, 0]} castShadow>
                <meshStandardMaterial color="#FBBF24" />
            </Cylinder>
        </group>
    );
}

export function HeroScene() {
    const [container, setContainer] = useState<HTMLElement | null>(null);
    return (
        <div ref={setContainer as any} className="w-full h-full relative" style={{ touchAction: 'none' }}>
            {container && (
            <Canvas eventSource={container} camera={{ position: [0, 2, 8], fov: 45 }} dpr={[1, 2]} shadows>
            <color attach="background" args={['transparent']} />

            <ambientLight intensity={0.5} />
            <directionalLight
                position={[10, 10, 5]}
                intensity={1.2}
                castShadow
                shadow-mapSize={[1024, 1024]}
            />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8B5CF6" />

            <PresentationControls
                rotation={[0, 0, 0]}
                polar={[-Math.PI / 4, Math.PI / 4]}
                azimuth={[-Math.PI / 4, Math.PI / 4]}
            >
                <group position={[0, -1, 0]}>
                    {/* Main central robot */}
                    <ToyRobot position={[0, 0, 0]} />

                    {/* Bouncing cubes around */}
                    <BouncingCube position={[-3, 0, -2]} color="#C4B5FD" delay={0} />
                    <BouncingCube position={[3, -0.5, 1]} color="#A78BFA" delay={1} />
                    <BouncingCube position={[-2, 1, 2]} color="#7C3AED" delay={2} />

                    {/* Floating Balloons */}
                    <FloatingBalloon position={[-4, 2, -1]} color="#5B21B6" delay={0.5} />
                    <FloatingBalloon position={[4, 3, -3]} color="#8B5CF6" delay={1.5} />

                    {/* Moving Train */}
                    <ToyTrain position={[0, -1.5, 0]} />

                    {/* Central floating island / platform */}
                    <Cylinder args={[3, 2.5, 0.5, 32]} position={[0, -2, 0]} receiveShadow>
                        <meshStandardMaterial color="#FCE7F3" roughness={0.1} metalness={0.1} />
                    </Cylinder>
                </group>
            </PresentationControls>

            <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={20} blur={2} far={4} />
            <Environment preset="city" />
        </Canvas>
        )}
        </div>
    );
}
