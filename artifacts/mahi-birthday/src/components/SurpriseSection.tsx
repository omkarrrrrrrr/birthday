import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export function SurpriseSection() {
  const [opened, setOpened] = useState(false);

  const handleSurprise = () => {
    setOpened(true);
    const end = Date.now() + 5000;
    const frame = () => {
      confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0, y: 0.7 }, colors: ['#A8224B', '#C4951A', '#E8D5B0'] });
      confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1, y: 0.7 }, colors: ['#A8224B', '#C4951A', '#E8D5B0'] });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  };

  return (
    <section className="py-24 px-4 flex flex-col justify-center items-center relative min-h-[50dvh]">
      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center mb-10"
      >
        <p className="text-secondary text-xs tracking-[0.3em] uppercase mb-2 font-sans">Something Special</p>
        <div className="gold-line w-20 mx-auto" />
      </motion.div>

      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.button
            key="btn"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileTap={{ scale: 0.96 }}
            onClick={handleSurprise}
            data-testid="button-surprise"
            className="relative px-10 py-5 rounded-full font-serif text-xl italic font-semibold overflow-hidden touch-manipulation min-h-[56px] transition-shadow"
            style={{
              background: 'linear-gradient(135deg, hsl(342 66% 33%), hsl(342 66% 26%))',
              border: '1px solid hsl(342 66% 39% / 0.6)',
              color: 'hsl(36 28% 92%)',
              boxShadow: '0 0 40px hsl(342 66% 39% / 0.2)',
            }}
          >
            <div className="absolute inset-0 bg-white/5 -translate-x-full hover:translate-x-full transition-transform duration-700 skew-x-12" />
            Open Your Surprise ❤️
          </motion.button>
        ) : (
          <motion.div
            key="msg"
            initial={{ opacity: 0, scale: 0.65, rotate: -6 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: 'spring', damping: 14 }}
            className="glass-panel p-8 md:p-12 rounded-2xl text-center max-w-sm mx-auto relative"
            style={{ border: '1px solid hsl(342 66% 39% / 0.4)' }}
          >
            {/* Corner details */}
            <div className="absolute top-3 left-3 w-5 h-5 border-l border-t" style={{ borderColor: 'hsl(43 72% 44% / 0.5)' }} />
            <div className="absolute top-3 right-3 w-5 h-5 border-r border-t" style={{ borderColor: 'hsl(43 72% 44% / 0.5)' }} />
            <div className="absolute bottom-3 left-3 w-5 h-5 border-l border-b" style={{ borderColor: 'hsl(43 72% 44% / 0.5)' }} />
            <div className="absolute bottom-3 right-3 w-5 h-5 border-r border-b" style={{ borderColor: 'hsl(43 72% 44% / 0.5)' }} />

            <motion.p className="text-3xl mb-6"
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}>❤️</motion.p>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <p className="font-serif text-2xl italic leading-snug" style={{ color: 'hsl(36 28% 90%)' }}>
                Mahi,<br />
                <span style={{ color: 'hsl(342 66% 55%)' }}>you are my favorite person,</span><br />
                my happiest memory,<br />
                and my greatest blessing.
              </p>
              <p className="font-serif text-xl italic mt-4" style={{ color: 'hsl(43 72% 55%)' }}>
                I love you ❤️
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
