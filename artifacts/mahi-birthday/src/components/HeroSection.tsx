import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

function RotatingHeart() {
  return (
    <div className="relative flex items-center justify-center w-48 h-48 md:w-72 md:h-72">
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-pink-500/20"
          style={{ width: `${80 + i * 44}px`, height: `${80 + i * 44}px` }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.08, 0.3] }}
          transition={{ duration: 2 + i * 0.5, repeat: Infinity, delay: i * 0.3 }}
        />
      ))}

      <motion.div
        animate={{
          rotateY: [0, 360],
          y: [0, -12, 0],
        }}
        transition={{
          rotateY: { duration: 6, repeat: Infinity, ease: 'linear' },
          y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
        }}
        style={{ transformStyle: 'preserve-3d', perspective: '500px' }}
        className="relative"
      >
        <svg width="130" height="115" viewBox="0 0 180 160" className="drop-shadow-[0_0_25px_rgba(255,20,147,0.8)]">
          <defs>
            <radialGradient id="heartGrad" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#FF69B4" />
              <stop offset="40%" stopColor="#FF1493" />
              <stop offset="100%" stopColor="#8B0057" />
            </radialGradient>
            <radialGradient id="heartShine" cx="35%" cy="25%" r="40%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </radialGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path
            d="M90 145 C90 145 15 100 15 55 C15 30 30 15 50 15 C65 15 80 25 90 40 C100 25 115 15 130 15 C150 15 165 30 165 55 C165 100 90 145 90 145Z"
            fill="url(#heartGrad)"
            filter="url(#glow)"
          />
          <path
            d="M90 145 C90 145 15 100 15 55 C15 30 30 15 50 15 C65 15 80 25 90 40 C100 25 115 15 130 15 C150 15 165 30 165 55 C165 100 90 145 90 145Z"
            fill="url(#heartShine)"
          />
          <ellipse cx="68" cy="45" rx="18" ry="12" fill="rgba(255,255,255,0.25)" transform="rotate(-20, 68, 45)" />
        </svg>
      </motion.div>

      {[...Array(6)].map((_, i) => {
        const angle = (i / 6) * 360;
        const r = 80;
        const x = Math.cos((angle * Math.PI) / 180) * r;
        const y = Math.sin((angle * Math.PI) / 180) * r;
        return (
          <motion.div
            key={i}
            className="absolute text-pink-300 text-xs select-none pointer-events-none"
            style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}
            animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
          >
            ✦
          </motion.div>
        );
      })}
    </div>
  );
}

function TypewriterText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => setStarted(true), delay * 1000);
    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 80);
    return () => clearInterval(interval);
  }, [started, text]);

  return (
    <span>
      {displayed}
      {displayed.length < text.length && started && (
        <span className="animate-pulse text-pink-400">|</span>
      )}
    </span>
  );
}

export function HeroSection() {
  return (
    <section className="relative w-full min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden px-4">
      <motion.div
        className="absolute inset-0 z-0"
        animate={{
          background: [
            'radial-gradient(ellipse at 20% 50%, rgba(139,92,246,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(255,20,147,0.15) 0%, transparent 60%)',
            'radial-gradient(ellipse at 80% 50%, rgba(139,92,246,0.15) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(255,20,147,0.15) 0%, transparent 60%)',
            'radial-gradient(ellipse at 20% 50%, rgba(139,92,246,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(255,20,147,0.15) 0%, transparent 60%)',
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white pointer-events-none"
          style={{
            width: Math.random() * 2.5 + 1,
            height: Math.random() * 2.5 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{ opacity: [0.1, 0.7, 0.1] }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}

      <div className="z-10 flex flex-col items-center gap-6 text-center">
        <RotatingHeart />

        <div className="space-y-3">
          <motion.h1
            className="font-serif text-3xl sm:text-5xl md:text-7xl font-bold leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <span
              className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-pink-300 to-purple-400"
              style={{ filter: 'drop-shadow(0 0 16px rgba(255,20,147,0.5))' }}
            >
              <TypewriterText text="Happy Birthday" delay={0.8} />
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-400">
              <TypewriterText text="Mahi ❤️" delay={2.5} />
            </span>
          </motion.h1>

          <motion.p
            className="text-base sm:text-xl md:text-2xl text-white/70 font-light tracking-wide px-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 4 }}
          >
            A universe of memories created by Omkar
          </motion.p>

          <motion.div
            className="flex items-center justify-center gap-2 text-pink-400/60 text-xs tracking-widest"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 5 }}
          >
            <span>✦</span>
            <span>20 July</span>
            <span>✦</span>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-white/40 text-[10px] tracking-widest">SCROLL</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-pink-500/0 via-pink-500/60 to-pink-500/0" />
      </motion.div>
    </section>
  );
}
