// @ts-nocheck
"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function BrainShape() {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.15;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.6}>
      <mesh ref={ref} scale={2.2}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          color="#00b4ff"
          emissive="#0066cc"
          emissiveIntensity={0.4}
          roughness={0.2}
          metalness={0.8}
          distort={0.25}
          speed={1.5}
          wireframe
        />
      </mesh>
    </Float>
  );
}

function Particles({ count = 200 }: { count?: number }) {
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return pos;
  }, [count]);

  const ref = useRef<THREE.Points>(null!);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
      ref.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#58a6ff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function InnerGlow() {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (ref.current) {
      const s = 2.0 + Math.sin(state.clock.elapsedTime * 0.8) * 0.15;
      ref.current.scale.set(s, s, s);
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        color="#0088ff"
        emissive="#0044aa"
        emissiveIntensity={1.2}
        transparent
        opacity={0.08}
      />
    </mesh>
  );
}

export default function Scene3D() {
  return (
    <div className="scene-3d-wrap">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <pointLight position={[-3, 2, -3]} intensity={0.6} color="#00b4ff" />
        <pointLight position={[3, -2, 3]} intensity={0.4} color="#6644ff" />

        <BrainShape />
        <InnerGlow />
        <Particles count={250} />
      </Canvas>
    </div>
  );
}
