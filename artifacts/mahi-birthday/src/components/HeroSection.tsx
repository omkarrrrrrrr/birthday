import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

function detectWebGL(): boolean {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl') || c.getContext('experimental-webgl'));
  } catch { return false; }
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
      depth: 2.5, bevelEnabled: true,
      bevelSegments: 4, steps: 1, bevelSize: 0.8, bevelThickness: 0.8,
    });
    geo.center();
    return geo;
  }, []);

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.y += 0.011;
    mesh.current.position.y = Math.sin(state.clock.elapsedTime * 0.75) * 0.55;
    mesh.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.38) * 0.07;
  });

  return (
    <mesh ref={mesh} geometry={geometry} scale={0.17}>
      <meshStandardMaterial
        color="#A8224B"
        emissive="#6B0A2A"
        emissiveIntensity={0.7}
        roughness={0.15}
        metalness={0.5}
      />
    </mesh>
  );
}

/* ── Floating micro-hearts (instanced) ─────────────────────────────────── */
function HeartParticles() {
  const COUNT = 40;
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const phases = useMemo(() => Float32Array.from({ length: COUNT }, () => Math.random() * Math.PI * 2), []);
  const speeds = useMemo(() => Float32Array.from({ length: COUNT }, () => 0.25 + Math.random() * 0.4), []);
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
  const positions = useMemo(() => Array.from({ length: COUNT }, () => ({
    x: (Math.random() - 0.5) * 26,
    y: (Math.random() - 0.5) * 18,
    z: (Math.random() - 0.5) * 8 - 6,
    scale: 0.015 + Math.random() * 0.045,
  })), []);

  useFrame((state) => {
    if (!mesh.current) return;
    positions.forEach((p, i) => {
      const t = state.clock.elapsedTime * speeds[i] + phases[i];
      dummy.position.set(p.x + Math.sin(t * 0.5) * 1.2, p.y + Math.sin(t) * 1.0, p.z);
      dummy.scale.setScalar(p.scale * (0.8 + 0.2 * Math.sin(t * 2)));
      dummy.rotation.z = Math.sin(t * 0.3) * 0.25;
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[geo, undefined, COUNT]}>
      <meshStandardMaterial color="#C4365A" emissive="#8B1A38" emissiveIntensity={0.6} transparent opacity={0.4} />
    </instancedMesh>
  );
}

/* ── Shooting stars ─────────────────────────────────────────────────────── */
function ShootingStars() {
  const COUNT = 4;
  const refs = useRef<(THREE.Mesh | null)[]>([]);
  const data = useMemo(() => Array.from({ length: COUNT }, () => ({
    x: -16 + Math.random() * 32,
    y: 6 + Math.random() * 5,
    speed: 10 + Math.random() * 8,
    delay: Math.random() * 8,
  })), []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    refs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const d = data[i];
      const phase = ((t + d.delay) % d.speed) / d.speed;
      mesh.position.x = d.x + phase * 28;
      mesh.position.y = d.y - phase * 10;
      (mesh.material as THREE.MeshBasicMaterial).opacity =
        phase < 0.1 ? phase / 0.1 : phase > 0.8 ? (1 - phase) / 0.2 : 1;
    });
  });

  return (
    <>
      {data.map((d, i) => (
        <mesh key={i} ref={(el) => { refs.current[i] = el; }} position={[d.x, d.y, -5]}>
          <planeGeometry args={[2.5, 0.035]} />
          <meshBasicMaterial color="#E8D5B0" transparent opacity={0} />
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
    }, 80);
    return () => clearInterval(iv);
  }, [started, text]);
  return (
    <span>
      {displayed}
      {displayed.length < text.length && started && (
        <span className="animate-pulse" style={{ color: 'hsl(43 72% 44%)' }}>|</span>
      )}
    </span>
  );
}

/* ── CSS fallback heart ─────────────────────────────────────────────────── */
function CSSHeart() {
  return (
    <motion.div
      animate={{ y: [0, -14, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      className="mb-6"
    >
      <svg width="120" height="106" viewBox="0 0 180 160"
        style={{ filter: 'drop-shadow(0 0 20px hsl(342 66% 39% / 0.7))' }}>
        <defs>
          <radialGradient id="hg2" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#C4405F" />
            <stop offset="55%" stopColor="#A8224B" />
            <stop offset="100%" stopColor="#6B0A2A" />
          </radialGradient>
        </defs>
        <path d="M90 145 C90 145 15 100 15 55 C15 30 30 15 50 15 C65 15 80 25 90 40 C100 25 115 15 130 15 C150 15 165 30 165 55 C165 100 90 145 90 145Z"
          fill="url(#hg2)" />
        <ellipse cx="70" cy="46" rx="16" ry="10" fill="rgba(255,255,255,0.22)" transform="rotate(-20,70,46)" />
      </svg>
    </motion.div>
  );
}

/* ── Main section ────────────────────────────────────────────────────────── */
export function HeroSection() {
  const [hasWebGL] = useState(detectWebGL);

  return (
    <section className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden">
      {hasWebGL && (
        <div className="absolute inset-0 z-0">
          <Canvas
            camera={{ position: [0, 0, 12], fov: 50 }}
            gl={{ antialias: false, powerPreference: 'high-performance', alpha: false }}
            dpr={[1, Math.min(window.devicePixelRatio, 2)]}
            style={{ background: 'transparent' }}
          >
            <color attach="background" args={['#08080F']} />
            <ambientLight intensity={0.15} />
            <pointLight position={[5, 5, 5]} intensity={2.5} color="#C4405F" />
            <pointLight position={[-5, -3, 3]} intensity={1.2} color="#C4951A" />
            <pointLight position={[0, -5, 2]} intensity={0.8} color="#A8224B" />
            <Stars radius={90} depth={60} count={2500} factor={3.5} saturation={0.1} fade speed={0.4} />
            <ShootingStars />
            <HeartParticles />
            <Heart3D />
          </Canvas>
        </div>
      )}

      {/* Vignette overlay */}
      <div className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 35%, hsl(242 38% 5%) 100%)' }} />

      {/* Text */}
      <div className="z-10 flex flex-col items-center gap-5 text-center px-5">
        {!hasWebGL && <CSSHeart />}

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.5 }}
          className="space-y-3"
        >
          {/* Eyebrow */}
          <motion.p
            className="text-secondary text-xs tracking-[0.35em] uppercase font-sans"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            From Omkar, with love
          </motion.p>

          <h1 className="font-serif font-light italic leading-none" style={{ color: 'hsl(36 28% 92%)' }}>
            <span className="block text-4xl sm:text-6xl md:text-7xl">
              <TypewriterText text="Happy Birthday" delay={1} />
            </span>
            <span className="block text-5xl sm:text-7xl md:text-8xl mt-1"
              style={{ background: 'linear-gradient(135deg, hsl(342 66% 55%), hsl(43 72% 60%))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              <TypewriterText text="Mahi" delay={2.6} />
            </span>
          </h1>

          <motion.div
            className="flex items-center justify-center gap-3 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 4.2 }}
          >
            <div className="gold-line w-12" />
            <span className="text-accent text-xs tracking-[0.3em] uppercase font-sans">20 July</span>
            <div className="gold-line w-12" />
          </motion.div>

          <motion.p
            className="text-sm font-sans font-light tracking-wide mt-1"
            style={{ color: 'hsl(36 28% 70%)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 4.8 }}
          >
            A universe of memories, crafted for you
          </motion.p>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        animate={{ opacity: [0.25, 0.8, 0.25] }}
        transition={{ duration: 2.8, repeat: Infinity }}
      >
        <span className="text-[10px] tracking-[0.3em] uppercase font-sans" style={{ color: 'hsl(36 28% 50%)' }}>Scroll</span>
        <div className="w-px h-10"
          style={{ background: 'linear-gradient(to bottom, transparent, hsl(43 72% 44% / 0.6), transparent)' }} />
      </motion.div>
    </section>
  );
}
