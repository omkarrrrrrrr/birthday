import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

/* ── WebGL availability check ──────────────────────────────────────────── */
function detectWebGL(): boolean {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl') || c.getContext('experimental-webgl'));
  } catch {
    return false;
  }
}

/* ── 3D Heart ───────────────────────────────────────────────────────────── */
function Heart3D() {
  const mesh = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    const x = 0, y = 0;
    shape.moveTo(x + 5, y + 5);
    shape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y);
    shape.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7);
    shape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19);
    shape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7);
    shape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y);
    shape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5);
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 2.5,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.8,
      bevelThickness: 0.8,
    });
    geo.center();
    return geo;
  }, []);

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.y += 0.012;
    mesh.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.6;
    mesh.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.4) * 0.08;
  });

  return (
    <mesh ref={mesh} geometry={geometry} scale={0.18}>
      <meshStandardMaterial
        color="#FF1493"
        emissive="#8B0057"
        emissiveIntensity={0.6}
        roughness={0.2}
        metalness={0.4}
      />
    </mesh>
  );
}

/* ── Floating heart sparks (instanced) ─────────────────────────────────── */
function HeartParticles() {
  const COUNT = 60;
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const phases = useMemo(() => Float32Array.from({ length: COUNT }, () => Math.random() * Math.PI * 2), []);
  const speeds = useMemo(() => Float32Array.from({ length: COUNT }, () => 0.3 + Math.random() * 0.5), []);

  const geo = useMemo(() => {
    const shape = new THREE.Shape();
    const x = 0, y = 0;
    shape.moveTo(x + 5, y + 5);
    shape.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y);
    shape.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7);
    shape.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19);
    shape.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7);
    shape.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y);
    shape.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5);
    return new THREE.ShapeGeometry(shape);
  }, []);

  const positions = useMemo(() =>
    Array.from({ length: COUNT }, () => ({
      x: (Math.random() - 0.5) * 28,
      y: (Math.random() - 0.5) * 20,
      z: (Math.random() - 0.5) * 10 - 8,
      scale: 0.02 + Math.random() * 0.06,
    })), []);

  useFrame((state) => {
    if (!mesh.current) return;
    positions.forEach((p, i) => {
      const t = state.clock.elapsedTime * speeds[i] + phases[i];
      dummy.position.set(p.x + Math.sin(t * 0.5) * 1.5, p.y + Math.sin(t) * 1.2, p.z);
      dummy.scale.setScalar(p.scale * (0.8 + 0.2 * Math.sin(t * 2)));
      dummy.rotation.z = Math.sin(t * 0.3) * 0.3;
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[geo, undefined, COUNT]}>
      <meshStandardMaterial color="#FF69B4" emissive="#FF1493" emissiveIntensity={0.8} transparent opacity={0.5} />
    </instancedMesh>
  );
}

/* ── Shooting stars ─────────────────────────────────────────────────────── */
function ShootingStars() {
  const COUNT = 5;
  const refs = useRef<(THREE.Mesh | null)[]>([]);
  const data = useMemo(() =>
    Array.from({ length: COUNT }, () => ({
      x: -16 + Math.random() * 32,
      y: 8 + Math.random() * 6,
      speed: 12 + Math.random() * 10,
      delay: Math.random() * 8,
    })), []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    refs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const d = data[i];
      const phase = ((t + d.delay) % d.speed) / d.speed;
      mesh.position.x = d.x + phase * 30;
      mesh.position.y = d.y - phase * 12;
      mesh.material.opacity = phase < 0.1 ? phase / 0.1 : phase > 0.8 ? (1 - phase) / 0.2 : 1;
    });
  });

  return (
    <>
      {data.map((d, i) => (
        <mesh key={i} ref={(el) => { refs.current[i] = el; }} position={[d.x, d.y, -5]}>
          <planeGeometry args={[2, 0.04]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0} />
        </mesh>
      ))}
    </>
  );
}

/* ── Typewriter ─────────────────────────────────────────────────────────── */
function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), delay * 1000);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const iv = setInterval(() => {
      setDisplayed(text.slice(0, ++i));
      if (i >= text.length) clearInterval(iv);
    }, 75);
    return () => clearInterval(iv);
  }, [started, text]);

  return (
    <span>
      {displayed}
      {displayed.length < text.length && started && <span className="animate-pulse text-pink-400">|</span>}
    </span>
  );
}

/* ── CSS fallback heart (shown when no WebGL) ─────────────────────────── */
function CSSHeart() {
  return (
    <motion.div
      animate={{ y: [0, -14, 0], rotateY: [0, 360] }}
      transition={{ y: { duration: 3, repeat: Infinity, ease: 'easeInOut' }, rotateY: { duration: 6, repeat: Infinity, ease: 'linear' } }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <svg width="130" height="115" viewBox="0 0 180 160" className="drop-shadow-[0_0_25px_rgba(255,20,147,0.9)]">
        <defs>
          <radialGradient id="hg" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#FF69B4" />
            <stop offset="45%" stopColor="#FF1493" />
            <stop offset="100%" stopColor="#8B0057" />
          </radialGradient>
        </defs>
        <path d="M90 145 C90 145 15 100 15 55 C15 30 30 15 50 15 C65 15 80 25 90 40 C100 25 115 15 130 15 C150 15 165 30 165 55 C165 100 90 145 90 145Z" fill="url(#hg)" />
        <ellipse cx="68" cy="45" rx="18" ry="12" fill="rgba(255,255,255,0.3)" transform="rotate(-20,68,45)" />
      </svg>
    </motion.div>
  );
}

/* ── Main section ────────────────────────────────────────────────────────── */
export function HeroSection() {
  const [hasWebGL] = useState(detectWebGL);

  return (
    <section className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden">
      {/* WebGL galaxy canvas — full background */}
      {hasWebGL && (
        <div className="absolute inset-0 z-0">
          <Canvas
            camera={{ position: [0, 0, 12], fov: 50 }}
            gl={{ antialias: false, powerPreference: 'high-performance', alpha: false }}
            dpr={[1, Math.min(window.devicePixelRatio, 2)]}
            style={{ background: 'transparent' }}
          >
            <ambientLight intensity={0.2} />
            <pointLight position={[5, 5, 5]} intensity={3} color="#FF1493" />
            <pointLight position={[-5, -3, 3]} intensity={1.5} color="#8B5CF6" />
            <pointLight position={[0, -6, 0]} intensity={1} color="#FF69B4" />

            <Stars radius={80} depth={50} count={3000} factor={4} saturation={0.3} fade speed={0.5} />
            <ShootingStars />
            <HeartParticles />
            <Heart3D />
          </Canvas>
        </div>
      )}

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 40%, #050510 100%)' }} />

      {/* Text content */}
      <div className="z-10 flex flex-col items-center gap-6 text-center px-4">
        {!hasWebGL && (
          <div className="mb-4">
            <CSSHeart />
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="space-y-3"
        >
          <h1 className="font-serif text-3xl sm:text-5xl md:text-7xl font-bold leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-pink-300 to-purple-400 drop-shadow-[0_0_20px_rgba(255,20,147,0.6)]">
              <TypewriterText text="Happy Birthday" delay={0.8} />
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-400">
              <TypewriterText text="Mahi ❤️" delay={2.4} />
            </span>
          </h1>

          <motion.p
            className="text-base sm:text-xl text-white/70 font-light tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 4 }}
          >
            A universe of memories created by Omkar
          </motion.p>

          <motion.div
            className="flex items-center justify-center gap-2 text-pink-400/50 text-xs tracking-widest"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 5 }}
          >
            <span>✦</span><span>20 July</span><span>✦</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5"
        animate={{ opacity: [0.3, 0.9, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        <span className="text-white/30 text-[10px] tracking-widest">SCROLL</span>
        <div className="w-px h-10 bg-gradient-to-b from-pink-500/0 via-pink-500/60 to-pink-500/0" />
      </motion.div>
    </section>
  );
}
