import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

/* ── Change this to your actual start date ── */
const TOGETHER_SINCE = new Date('2026-05-22');

function getDays() {
  const ms = Date.now() - TOGETHER_SINCE.getTime();
  return Math.max(0, Math.floor(ms / (1000 * 60 * 60 * 24)));
}

function useCountUp(target: number, duration = 1800) {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  const start = () => {
    if (started.current) return;
    started.current = true;
    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3); // cubic ease-out
      setCount(Math.round(ease * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  return { count, start };
}

export function DaysCounter() {
  const days = getDays();
  const { count, start } = useCountUp(days);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => { if (inView) start(); }, [inView, start]);

  return (
    <section ref={ref} className="py-20 px-4 w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-xs mx-auto text-center"
      >
        {/* Top gold line */}
        <div className="gold-line w-32 mx-auto mb-8" />

        <p className="text-secondary text-xs tracking-[0.35em] uppercase mb-6 font-sans">
          Us, in numbers
        </p>

        {/* Big number */}
        <div className="relative inline-block">
          <span
            className="font-serif font-light leading-none"
            style={{
              fontSize: 'clamp(5rem, 22vw, 9rem)',
              background: 'linear-gradient(135deg, hsl(36 28% 88%), hsl(342 66% 55%), hsl(43 72% 55%))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.02em',
            }}
          >
            {count}
          </span>
          {/* Subtle glow behind number */}
          <div className="absolute inset-0 pointer-events-none blur-3xl -z-10 opacity-20"
            style={{ background: 'radial-gradient(ellipse, hsl(342 66% 39%), transparent 70%)' }} />
        </div>

        <p className="font-serif italic text-xl mt-2 mb-6" style={{ color: 'hsl(36 28% 70%)' }}>
          days together
        </p>

        {/* Bottom gold line */}
        <div className="gold-line w-32 mx-auto mb-6" />

        <p className="font-sans font-light text-sm" style={{ color: 'hsl(36 28% 50%)' }}>
          Since {TOGETHER_SINCE.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
      </motion.div>
    </section>
  );
}
