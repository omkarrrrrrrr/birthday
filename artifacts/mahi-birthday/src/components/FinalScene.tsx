import { motion } from 'framer-motion';

const HEARTS = [...Array(10)].map((_, i) => ({
  id: i,
  left: `${10 + i * 8}%`,
  size: Math.floor(20 + (i % 4) * 15),
  duration: 12 + (i % 5) * 2,
  delay: i * 1.1,
}));

export function FinalScene() {
  return (
    <section className="min-h-[100dvh] w-full flex items-center justify-center relative overflow-hidden bg-black pb-safe">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-black to-black" />

      {HEARTS.map((h) => (
        <motion.div
          key={h.id}
          className="absolute text-primary opacity-20 select-none pointer-events-none"
          style={{ left: h.left, fontSize: h.size, bottom: '-10%' }}
          animate={{ y: '-110vh', rotate: 360 }}
          transition={{
            duration: h.duration,
            repeat: Infinity,
            ease: 'linear',
            delay: h.delay,
          }}
        >
          ❤️
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2 }}
        className="z-10 text-center px-5"
      >
        <h2 className="font-serif text-4xl sm:text-6xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-secondary text-glow mb-6 leading-tight">
          To Infinity &<br />Beyond ❤️
        </h2>
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-white/50 tracking-[0.4em] uppercase text-xs sm:text-sm"
        >
          FOREVER YOURS
        </motion.p>
      </motion.div>
    </section>
  );
}
