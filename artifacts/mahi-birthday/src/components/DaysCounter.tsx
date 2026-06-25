import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const TOGETHER_SINCE = new Date('2026-03-12T00:00:00');

function getElapsed() {
  const ms = Math.max(0, Date.now() - TOGETHER_SINCE.getTime());
  const totalSec = Math.floor(ms / 1000);
  const days    = Math.floor(totalSec / 86400);
  const hours   = Math.floor((totalSec % 86400) / 3600);
  const minutes = Math.floor((totalSec % 3600) / 60);
  const seconds = totalSec % 60;
  return { days, hours, minutes, seconds };
}

function pad(n: number) { return String(n).padStart(2, '0'); }

function Unit({ value, label, delay }: { value: string; label: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay }}
      className="flex flex-col items-center"
    >
      <div
        className="rounded-xl px-3 py-3 min-w-[64px] text-center relative overflow-hidden"
        style={{
          background: 'rgba(8,6,20,0.6)',
          border: '1px solid hsl(342 66% 39% / 0.25)',
          boxShadow: '0 4px 24px hsl(342 66% 39% / 0.08)',
        }}
      >
        {/* subtle shimmer line at top */}
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, hsl(43 72% 44% / 0.5), transparent)' }} />

        <span
          className="font-serif font-light tabular-nums leading-none"
          style={{
            fontSize: 'clamp(1.8rem, 8vw, 3rem)',
            background: 'linear-gradient(160deg, hsl(36 28% 92%), hsl(342 66% 58%), hsl(43 72% 55%))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {value}
        </span>
      </div>
      <span className="text-[10px] tracking-[0.25em] uppercase mt-2 font-sans"
        style={{ color: 'hsl(36 28% 45%)' }}>
        {label}
      </span>
    </motion.div>
  );
}

export function DaysCounter() {
  const [elapsed, setElapsed] = useState(getElapsed);

  useEffect(() => {
    const id = setInterval(() => setElapsed(getElapsed()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="py-20 px-4 w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-10"
      >
        <p className="text-secondary text-xs tracking-[0.35em] uppercase mb-3 font-sans">And counting…</p>
        <h2 className="font-serif text-4xl md:text-5xl text-foreground italic">Time Together</h2>
        <div className="gold-line w-28 mx-auto mt-5" />
      </motion.div>

      {/* Counter grid */}
      <div className="flex items-start justify-center gap-3 sm:gap-5 flex-wrap">
        <Unit value={String(elapsed.days)} label="Days"    delay={0}    />

        {/* Colon separator */}
        <span className="font-serif text-3xl self-center pb-5"
          style={{ color: 'hsl(342 66% 39% / 0.6)', lineHeight: 1 }}>:</span>

        <Unit value={pad(elapsed.hours)}   label="Hours"   delay={0.08} />

        <span className="font-serif text-3xl self-center pb-5"
          style={{ color: 'hsl(342 66% 39% / 0.6)', lineHeight: 1 }}>:</span>

        <Unit value={pad(elapsed.minutes)} label="Minutes" delay={0.16} />

        <span className="font-serif text-3xl self-center pb-5"
          style={{ color: 'hsl(342 66% 39% / 0.6)', lineHeight: 1 }}>:</span>

        <Unit value={pad(elapsed.seconds)} label="Seconds" delay={0.24} />
      </div>

      {/* Since label */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.4 }}
        className="text-center mt-8 font-sans font-light text-sm"
        style={{ color: 'hsl(36 28% 40%)' }}
      >
        Since 12 March 2026 ❤️
      </motion.p>
    </section>
  );
}
