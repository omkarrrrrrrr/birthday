import { motion } from 'framer-motion';

const HEARTS = [...Array(8)].map((_, i) => ({
  id: i,
  left: `${8 + i * 11}%`,
  size: 16 + (i % 4) * 12,
  duration: 14 + (i % 5) * 2,
  delay: i * 1.4,
}));

export function FinalScene() {
  return (
    <section className="min-h-[100dvh] w-full flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: 'hsl(242 38% 4%)' }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, hsl(342 66% 39% / 0.1) 0%, transparent 65%)' }} />

      {HEARTS.map((h) => (
        <motion.div
          key={h.id}
          className="absolute select-none pointer-events-none"
          style={{ left: h.left, fontSize: h.size, bottom: '-8%', opacity: 0.12 }}
          animate={{ y: '-110vh', rotate: 360 }}
          transition={{ duration: h.duration, repeat: Infinity, ease: 'linear', delay: h.delay }}
        >
          ❤️
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.8 }}
        className="z-10 text-center px-5"
      >
        {/* Decorative element */}
        <p className="text-secondary text-xs tracking-[0.35em] uppercase mb-8 font-sans">Always & Forever</p>
        <div className="gold-line w-24 mx-auto mb-10" />

        <h2 className="font-serif font-light italic leading-tight text-glow mb-6"
          style={{
            fontSize: 'clamp(2.4rem, 10vw, 6rem)',
            background: 'linear-gradient(135deg, hsl(36 28% 88%), hsl(342 66% 55%), hsl(43 72% 55%), hsl(36 28% 88%))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundSize: '200%',
          }}>
          To Infinity<br />&amp; Beyond
        </h2>

        <p className="text-3xl mb-10">❤️</p>

        <div className="gold-line w-24 mx-auto mb-8" />

        <motion.p
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="text-xs tracking-[0.4em] uppercase font-sans"
          style={{ color: 'hsl(43 72% 44%)' }}
        >
          Forever Yours — Omkar
        </motion.p>
      </motion.div>
    </section>
  );
}
