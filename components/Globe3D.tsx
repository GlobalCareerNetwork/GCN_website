"use client";

import { useRef, useEffect, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Line } from "@react-three/drei";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

// ── Orbit line geometry helpers ───────────────────────────────────────────

function latitudePoints(lat: number, radius: number, segments = 80): THREE.Vector3[] {
  const pts: THREE.Vector3[] = [];
  const phi = (90 - lat) * (Math.PI / 180);
  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * 2 * Math.PI;
    pts.push(
      new THREE.Vector3(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
      )
    );
  }
  return pts;
}

function longitudePoints(lon: number, radius: number, segments = 80): THREE.Vector3[] {
  const pts: THREE.Vector3[] = [];
  const theta = lon * (Math.PI / 180);
  for (let i = 0; i <= segments; i++) {
    const phi = (i / segments) * Math.PI;
    pts.push(
      new THREE.Vector3(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta)
      )
    );
  }
  return pts;
}

// ── Globe mesh ────────────────────────────────────────────────────────────

const BRAND_RED = "#9e221a";
const RED_DIM = "rgba(158,34,26,0.35)";
const SPHERE_RADIUS = 1.8;

// Latitude rings and longitude arcs that form the orbit-line motif
const LAT_LINES = [-60, -30, 0, 30, 60];
const LON_LINES = [0, 45, 90, 135, 180, 225, 270, 315];

interface GlobeSceneProps {
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
  resumeRef: React.MutableRefObject<ReturnType<typeof setTimeout> | null>;
}

function GlobeScene({ controlsRef, resumeRef }: GlobeSceneProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const autoRotate = useRef(true);
  const { gl } = useThree();

  // Pause auto-rotation when user drags; resume after 2.5s idle
  useEffect(() => {
    const canvas = gl.domElement;
    const pause = () => {
      autoRotate.current = false;
      if (resumeRef.current) clearTimeout(resumeRef.current);
      resumeRef.current = setTimeout(() => {
        autoRotate.current = true;
      }, 2500);
    };
    canvas.addEventListener("pointerdown", pause);
    return () => canvas.removeEventListener("pointerdown", pause);
  }, [gl, resumeRef]);

  useFrame((_, delta) => {
    if (autoRotate.current && meshRef.current) {
      meshRef.current.rotation.y += delta * 0.25;
    }
    // Keep orbit controls in sync with the mesh rotation
    if (controlsRef.current) {
      controlsRef.current.update();
    }
  });

  return (
    <group ref={meshRef}>
      {/* Sphere */}
      <mesh>
        <sphereGeometry args={[SPHERE_RADIUS, 48, 48]} />
        <meshStandardMaterial
          color={BRAND_RED}
          transparent
          opacity={0.12}
          wireframe={false}
        />
      </mesh>

      {/* Outer glow ring */}
      <mesh>
        <sphereGeometry args={[SPHERE_RADIUS * 1.02, 48, 48]} />
        <meshStandardMaterial
          color={BRAND_RED}
          transparent
          opacity={0.04}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Latitude orbit lines */}
      {LAT_LINES.map((lat) => (
        <Line
          key={`lat-${lat}`}
          points={latitudePoints(lat, SPHERE_RADIUS * 1.001)}
          color={lat === 0 ? BRAND_RED : RED_DIM}
          lineWidth={lat === 0 ? 1.5 : 0.8}
          transparent
          opacity={lat === 0 ? 0.9 : 0.45}
        />
      ))}

      {/* Longitude orbit lines */}
      {LON_LINES.map((lon) => (
        <Line
          key={`lon-${lon}`}
          points={longitudePoints(lon, SPHERE_RADIUS * 1.001)}
          color={RED_DIM}
          lineWidth={0.8}
          transparent
          opacity={0.35}
        />
      ))}

      {/* Bold equatorial ring — the signature orbit line */}
      <Line
        points={latitudePoints(0, SPHERE_RADIUS * 1.015)}
        color={BRAND_RED}
        lineWidth={2.5}
        transparent
        opacity={1}
      />

      {/* Secondary tilted orbit arc */}
      <group rotation={[0, 0, Math.PI / 5]}>
        <Line
          points={latitudePoints(0, SPHERE_RADIUS * 1.025)}
          color={BRAND_RED}
          lineWidth={1.2}
          transparent
          opacity={0.6}
        />
      </group>
    </group>
  );
}

// ── Public component ──────────────────────────────────────────────────────

interface Globe3DProps {
  className?: string;
}

export default function Globe3D({ className }: Globe3DProps) {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const resumeRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onCreated = useCallback(() => {}, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    const ref = resumeRef;
    return () => {
      if (ref.current) clearTimeout(ref.current);
    };
  }, [resumeRef]);

  return (
    <div
      className={className}
      aria-label="Auto-rotating 3D globe — drag to interact"
      role="img"
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={onCreated}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} />
        <pointLight position={[-4, -4, -4]} intensity={0.4} color={BRAND_RED} />
        <GlobeScene controlsRef={controlsRef} resumeRef={resumeRef} />
        <OrbitControls
          ref={controlsRef}
          enableZoom={false}
          enablePan={false}
          enableDamping
          dampingFactor={0.08}
          rotateSpeed={0.6}
        />
      </Canvas>
    </div>
  );
}
