// @ts-nocheck
"use client";

import { useRef, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

/* ── Brain Node Network ─────────────────────────────────── */
function BrainNetwork() {
  const groupRef = useRef<THREE.Group>(null!);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Create nodes on a sphere surface (brain-like)
  const { nodes, edges } = useMemo(() => {
    const pts: [number, number, number][] = [];
    const phi = (1 + Math.sqrt(5)) / 2; // golden ratio
    const count = 60;
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = 2 * Math.PI * i / phi;
      const r = 1.8 + (Math.random() - 0.5) * 0.3;
      pts.push([
        Math.cos(theta) * radius * r,
        y * r,
        Math.sin(theta) * radius * r,
      ]);
    }

    // Connect nearby nodes
    const edgeList: [number, number][] = [];
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i][0] - pts[j][0];
        const dy = pts[i][1] - pts[j][1];
        const dz = pts[i][2] - pts[j][2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < 1.4) {
          edgeList.push([i, j]);
        }
      }
    }
    return { nodes: pts, edges: edgeList };
  }, []);

  // Mouse tracking
  const handlePointerMove = useCallback((e: any) => {
    mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    // Smooth rotation with mouse influence
    const mx = mouseRef.current.x * 0.3;
    const my = mouseRef.current.y * 0.2;
    groupRef.current.rotation.y = t * 0.08 + mx;
    groupRef.current.rotation.x = Math.sin(t * 0.05) * 0.1 + my;

    // Register global mouse listener
    if (typeof window !== "undefined" && !(window as any).__brain3dListener) {
      window.addEventListener("mousemove", (e: MouseEvent) => {
        mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
        mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
      });
      (window as any).__brain3dListener = true;
    }
  });

  const nodePositions = useMemo(
    () => new Float32Array(nodes.flat()),
    [nodes]
  );

  return (
    <group ref={groupRef}>
      {/* Nodes */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[nodePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          color="#00b4ff"
          transparent
          opacity={0.9}
          sizeAttenuation
        />
      </points>

      {/* Edges */}
      {edges.map(([a, b], i) => {
        const start = new THREE.Vector3(...nodes[a]);
        const end = new THREE.Vector3(...nodes[b]);
        const mid = start.clone().add(end).multiplyScalar(0.5);
        const dir = end.clone().sub(start);
        const len = dir.length();
        return (
          <mesh key={i} position={mid} quaternion={new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize())}>
            <cylinderGeometry args={[0.005, 0.005, len, 4]} />
            <meshBasicMaterial color="#1a6faa" transparent opacity={0.25} />
          </mesh>
        );
      })}
    </group>
  );
}

/* ── Distorted Core Mesh ────────────────────────────────── */
function CoreMesh() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.12;
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.08) * 0.15;
    }
  });
  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.4}>
      <mesh ref={ref} scale={1.5}>
        <icosahedronGeometry args={[1, 3]} />
        <MeshDistortMaterial
          color="#0088ff"
          emissive="#003388"
          emissiveIntensity={0.5}
          roughness={0.15}
          metalness={0.9}
          distort={0.3}
          speed={2}
          wireframe
        />
      </mesh>
    </Float>
  );
}

/* ── Inner Glow Sphere ──────────────────────────────────── */
function InnerGlow() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    if (ref.current) {
      const s = 1.8 + Math.sin(state.clock.elapsedTime * 0.6) * 0.2;
      ref.current.scale.set(s, s, s);
    }
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        color="#0066ff"
        emissive="#0033cc"
        emissiveIntensity={1.5}
        transparent
        opacity={0.06}
      />
    </mesh>
  );
}

/* ── Floating Particles ─────────────────────────────────── */
function Particles({ count = 300 }: { count?: number }) {
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 14;
      sizes[i] = Math.random() * 0.03 + 0.01;
    }
    return { pos, sizes };
  }, [count]);

  const ref = useRef<THREE.Points>(null!);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.015;
      ref.current.rotation.x = state.clock.elapsedTime * 0.008;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions.pos, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#58a6ff"
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
}

/* ── Orbit Rings ────────────────────────────────────────── */
function OrbitRings() {
  const ref1 = useRef<THREE.Mesh>(null!);
  const ref2 = useRef<THREE.Mesh>(null!);
  const ref3 = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ref1.current) {
      ref1.current.rotation.x = 0.4;
      ref1.current.rotation.z = t * 0.05;
    }
    if (ref2.current) {
      ref2.current.rotation.x = -0.3;
      ref2.current.rotation.y = t * 0.04;
    }
    if (ref3.current) {
      ref3.current.rotation.z = 0.6;
      ref3.current.rotation.x = t * 0.03;
    }
  });

  return (
    <>
      <mesh ref={ref1} scale={2.8}>
        <torusGeometry args={[1, 0.004, 8, 100]} />
        <meshBasicMaterial color="#1a6faa" transparent opacity={0.15} />
      </mesh>
      <mesh ref={ref2} scale={3.2}>
        <torusGeometry args={[1, 0.003, 8, 100]} />
        <meshBasicMaterial color="#0088ff" transparent opacity={0.1} />
      </mesh>
      <mesh ref={ref3} scale={3.6}>
        <torusGeometry args={[1, 0.003, 8, 100]} />
        <meshBasicMaterial color="#3399ff" transparent opacity={0.08} />
      </mesh>
    </>
  );
}

/* ── Main Scene ─────────────────────────────────────────── */
export default function Scene3D() {
  return (
    <div className="scene-3d-wrap">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 5, 5]} intensity={0.6} />
        <pointLight position={[-4, 3, -3]} intensity={0.8} color="#00b4ff" distance={15} />
        <pointLight position={[4, -2, 4]} intensity={0.5} color="#6644ff" distance={15} />
        <pointLight position={[0, 0, 3]} intensity={0.3} color="#00ffcc" distance={10} />

        <BrainNetwork />
        <CoreMesh />
        <InnerGlow />
        <OrbitRings />
        <Particles count={350} />
      </Canvas>
    </div>
  );
}
