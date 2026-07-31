"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import type { CSSProperties } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, OrbitControls, Line } from "@react-three/drei";
import Image from "next/image";
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
const RED_DIM = "#9e221a";
const SPHERE_RADIUS = 1.8;

// Latitude rings and longitude arcs that form the orbit-line motif
const LAT_LINES = [-60, -30, 0, 30, 60];
const LON_LINES = [0, 45, 90, 135, 180, 225, 270, 315];

const CAREER_MARKERS = [
  {
    flag: "🇮🇳",
    name: "Arjun",
    origin: "India",
    quote: "GCN helped me turn career uncertainty into a clear internship plan.",
    initials: "A",
    lat: 20.6,
    lon: 78.9,
    cardOffset: [-220, 82],
    visibilityCutoff: 0.38,
    avatarSrc: "/images/career-avatars/arjun.jpg",
  },
  {
    flag: "🇻🇳",
    name: "Minh",
    origin: "Vietnam",
    quote: "The workshops helped me understand which roles actually fit me.",
    initials: "M",
    lat: 14.1,
    lon: 108.3,
    cardOffset: [46, 72],
    visibilityCutoff: 0.38,
    avatarSrc: "/images/career-avatars/minh.jpg",
  },
  {
    flag: "🇺🇸",
    name: "Ava",
    origin: "United States",
    quote: "GCN made networking feel approachable instead of intimidating.",
    initials: "A",
    lat: 39.8,
    lon: -98.6,
    cardOffset: [-96, 94],
    visibilityCutoff: 0.38,
    avatarSrc: "/images/career-avatars/ava.jpg",
  },
  {
    flag: "🇦🇪",
    name: "Noor",
    origin: "Dubai, UAE",
    quote: "I found mentors at GCN who pushed me to apply with confidence.",
    initials: "N",
    lat: 25.2,
    lon: 55.3,
    cardOffset: [-168, 72],
    visibilityCutoff: 0.38,
    avatarSrc: "/images/career-avatars/noor.jpg",
  },
  {
    flag: "🇨🇳",
    name: "Li Wei",
    origin: "China",
    quote: "GCN gave me a better picture of the career path I wanted.",
    initials: "LW",
    lat: 35.9,
    lon: 104.2,
    cardOffset: [46, 48],
    visibilityCutoff: 0.38,
    avatarSrc: "/images/career-avatars/li-wei.jpg",
    spotlightBias: 0.25,
  },
  {
    flag: "🇦🇺",
    name: "Olivia",
    origin: "Australia",
    quote: "Every event gave me practical steps I could use right away.",
    initials: "O",
    lat: -25.3,
    lon: 133.8,
    cardOffset: [-184, -150],
    visibilityCutoff: 0.38,
    avatarSrc: "/images/career-avatars/olivia.jpg",
  },
  {
    flag: "🇧🇷",
    name: "Maria",
    origin: "Brazil",
    quote: "GCN helped me build the professional confidence I was missing.",
    initials: "M",
    lat: -14.2,
    lon: -51.9,
    cardOffset: [-196, -136],
    visibilityCutoff: 0.38,
    avatarSrc: "/images/career-avatars/maria.jpg",
  },
  {
    flag: "🇿🇦",
    name: "Thabo",
    origin: "South Africa",
    quote: "I left GCN events with real people to follow up with, not just notes.",
    initials: "T",
    lat: -30.6,
    lon: 22.9,
    cardOffset: [-218, -132],
    visibilityCutoff: 0.38,
    avatarSrc: "/images/career-avatars/thabo.jpg",
  },
];

function latLonToSpherePoint(lat: number, lon: number, radius: number) {
  const latitude = lat * (Math.PI / 180);
  const theta = ((lon + 180) / 360) * Math.PI * 2;
  const cosLat = Math.cos(latitude);

  return new THREE.Vector3(
    -radius * Math.cos(theta) * cosLat,
    radius * Math.sin(latitude),
    radius * Math.sin(theta) * cosLat
  );
}

type Coordinate = [number, number];

interface LandFeature {
  type: "Feature";
  geometry: {
    type: "Polygon" | "MultiPolygon";
    coordinates: Coordinate[][] | Coordinate[][][];
  };
}

interface LandFeatureCollection {
  type: "FeatureCollection";
  features: LandFeature[];
}

function projectCoordinate([longitude, latitude]: Coordinate, width: number, height: number) {
  return {
    x: ((longitude + 180) / 360) * width,
    y: ((90 - latitude) / 180) * height,
  };
}

function drawRing(
  context: CanvasRenderingContext2D,
  ring: Coordinate[],
  width: number,
  height: number
) {
  ring.forEach((coordinate, index) => {
    const point = projectCoordinate(coordinate, width, height);
    if (index === 0) context.moveTo(point.x, point.y);
    else context.lineTo(point.x, point.y);
  });
}

function drawPolygon(
  context: CanvasRenderingContext2D,
  rings: Coordinate[][],
  width: number,
  height: number
) {
  if (!rings.length) return;

  context.beginPath();
  drawRing(context, rings[0], width, height);
  context.closePath();
  context.fill();
  context.stroke();

  context.save();
  context.globalCompositeOperation = "destination-out";
  rings.slice(1).forEach((ring) => {
    context.beginPath();
    drawRing(context, ring, width, height);
    context.closePath();
    context.fill();
  });
  context.restore();
}

function createEtchedMapTexture(landData?: LandFeatureCollection) {
  if (typeof document === "undefined") return null;

  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const context = canvas.getContext("2d");
  if (!context) return null;

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.strokeStyle = "rgba(158, 34, 26, 0.16)";
  context.lineWidth = 1;

  for (let x = 0; x <= canvas.width; x += 64) {
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x, canvas.height);
    context.stroke();
  }

  for (let y = 0; y <= canvas.height; y += 48) {
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(canvas.width, y);
    context.stroke();
  }

  if (landData) {
    context.fillStyle = "rgba(122, 24, 20, 0.26)";
    context.strokeStyle = "rgba(122, 24, 20, 0.78)";
    context.lineWidth = 1.55;

    landData.features.forEach((feature) => {
      if (feature.geometry.type === "Polygon") {
        drawPolygon(context, feature.geometry.coordinates as Coordinate[][], canvas.width, canvas.height);
        return;
      }

      (feature.geometry.coordinates as Coordinate[][][]).forEach((polygon) => {
        drawPolygon(context, polygon, canvas.width, canvas.height);
      });
    });
  }

  for (let i = 0; i < 900; i += 1) {
    const x = ((i * 193) % canvas.width) + 0.5;
    const y = ((i * 389) % canvas.height) + 0.5;
    context.fillStyle = "rgba(12, 12, 14, 0.026)";
    context.fillRect(x, y, 1, 1);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

interface GlobeSceneProps {
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
  resumeRef: React.MutableRefObject<ReturnType<typeof setTimeout> | null>;
}

interface CareerMarkerProps {
  marker: (typeof CAREER_MARKERS)[number];
  active: boolean;
}

function CareerMarker({ marker, active }: CareerMarkerProps) {
  const surfacePosition = latLonToSpherePoint(marker.lat, marker.lon, SPHERE_RADIUS * 1.035);
  const labelOffset = surfacePosition.clone().normalize().multiplyScalar(0.38);

  return (
    <group position={surfacePosition}>
      <mesh visible={active}>
        <sphereGeometry args={[0.038, 16, 16]} />
        <meshBasicMaterial color={BRAND_RED} />
      </mesh>
      <mesh visible={active}>
        <sphereGeometry args={[0.082, 16, 16]} />
        <meshBasicMaterial color={BRAND_RED} transparent opacity={0.12} />
      </mesh>
      <Html
        center
        distanceFactor={3.4}
        position={labelOffset}
        style={{ pointerEvents: "none" }}
        zIndexRange={marker.name === "Arjun" ? [42, 0] : [16, 0]}
      >
        <article
          className="gcn-spotlight-card gcn-spotlight-card-anchored"
          data-visible={active ? "true" : "false"}
          style={
            {
              "--card-x": `${marker.cardOffset[0]}px`,
              "--card-y": `${marker.cardOffset[1]}px`,
            } as CSSProperties
          }
        >
          <div className="gcn-spotlight-avatar" aria-hidden="true">
            <Image
              src={marker.avatarSrc}
              alt=""
              width={42}
              height={42}
              sizes="42px"
              unoptimized
            />
          </div>
          <div>
            <p>
              <span>{marker.flag}</span> {marker.name}
            </p>
            <strong>&ldquo;{marker.quote}&rdquo;</strong>
            <small>{marker.origin}</small>
          </div>
        </article>
      </Html>
    </group>
  );
}

function GlobeScene({ controlsRef, resumeRef }: GlobeSceneProps) {
  const meshRef = useRef<THREE.Group>(null);
  const autoRotate = useRef(true);
  const activeMarkerRef = useRef<string | null>(null);
  const { camera, gl } = useThree();
  const [mapTexture, setMapTexture] = useState<THREE.CanvasTexture | null>(() =>
    createEtchedMapTexture()
  );
  const [activeMarker, setActiveMarker] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch("/data/land-110m.geojson")
      .then((response) => response.json() as Promise<LandFeatureCollection>)
      .then((landData) => {
        if (cancelled) return;
        const texture = createEtchedMapTexture(landData);
        if (texture) setMapTexture(texture);
      })
      .catch(() => {
        if (cancelled) return;
        const texture = createEtchedMapTexture();
        if (texture) setMapTexture(texture);
      });

    return () => {
      cancelled = true;
    };
  }, []);

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
      meshRef.current.rotation.y += delta * 0.14;
    }
    // Keep orbit controls in sync with the mesh rotation
    if (controlsRef.current) {
      controlsRef.current.update();
    }

    if (meshRef.current) {
      meshRef.current.updateMatrixWorld();

      const nextActive =
        CAREER_MARKERS.map((marker) => {
          const localPosition = latLonToSpherePoint(marker.lat, marker.lon, SPHERE_RADIUS * 1.035);
          const worldPosition = localPosition.applyMatrix4(meshRef.current!.matrixWorld);
          const normal = worldPosition.clone().normalize();
          const cameraDirection = camera.position.clone().sub(worldPosition).normalize();
          const frontScore = normal.dot(cameraDirection);
          const sortScore = frontScore + (marker.spotlightBias ?? 0);

          return { marker, frontScore, sortScore };
        })
          .filter(({ marker, frontScore }) => frontScore > marker.visibilityCutoff)
          .sort((a, b) => b.sortScore - a.sortScore)[0]?.marker.name ?? null;

      if (nextActive !== activeMarkerRef.current) {
        activeMarkerRef.current = nextActive;
        setActiveMarker(nextActive);
      }
    }
  });

  return (
    <group ref={meshRef} rotation={[0, -2.25, 0]}>
      {/* Sphere */}
      <mesh>
        <sphereGeometry args={[SPHERE_RADIUS, 48, 48]} />
        <meshStandardMaterial
          color="#f5efe3"
          map={mapTexture ?? undefined}
          transparent
          opacity={0.96}
          wireframe={false}
          roughness={0.9}
          metalness={0}
        />
      </mesh>

      {/* Outer glow ring */}
      <mesh>
        <sphereGeometry args={[SPHERE_RADIUS * 1.02, 48, 48]} />
        <meshStandardMaterial
          color={BRAND_RED}
          transparent
          opacity={0.08}
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
          opacity={lat === 0 ? 0.75 : 0.32}
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
          opacity={0.28}
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
      <group rotation={[Math.PI / 8, 0, -Math.PI / 4]}>
        <Line
          points={latitudePoints(0, SPHERE_RADIUS * 1.035)}
          color={BRAND_RED}
          lineWidth={0.9}
          transparent
          opacity={0.5}
        />
      </group>
      {CAREER_MARKERS.map((marker) => (
        <CareerMarker
          key={`${marker.origin}-${marker.name}`}
          marker={marker}
          active={activeMarker === marker.name}
        />
      ))}
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
      aria-label="Auto-rotating 3D globe. Drag to interact."
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
          rotateSpeed={0.42}
        />
      </Canvas>
    </div>
  );
}
