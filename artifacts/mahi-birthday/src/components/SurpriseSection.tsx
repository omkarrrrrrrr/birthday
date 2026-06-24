import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export function SurpriseSection() {
  const [opened, setOpened] = useState(false);

  const handleSurprise = () => {
    setOpened(true);

    const end = Date.now() + 5000;
    const frame = () => {
      confetti({
        particleCount: 6,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ['#FF1493', '#8B5CF6', '#FFD700'],
      });
      confetti({
        particleCount: 6,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ['#FF1493', '#8B5CF6', '#FFD700'],
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  };

  return (
    <section className="py-24 px-4 flex flex-col justify-center items-center relative min-h-[50dvh]">
      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.button
            key="btn"
            whileTap={{ scale: 0.93 }}
            onClick={handleSurprise}
            data-testid="button-surprise"
            className="relative px-10 py-5 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-serif text-xl font-bold shadow-[0_0_40px_rgba(255,20,147,0.6)] active:shadow-[0_0_60px_rgba(255,20,147,0.9)] transition-shadow overflow-hidden touch-manipulation min-h-[56px]"
          >
            <div className="absolute inset-0 bg-white/20 -translate-x-full hover:translate-x-full transition-transform duration-700 ease-in-out skew-x-12" />
            Open Your Surprise ❤️
          </motion.button>
        ) : (
          <motion.div
            key="msg"
            initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: 'spring', damping: 14 }}
            className="glass-panel p-8 md:p-12 rounded-3xl text-center max-w-lg mx-auto relative z-20 box-glow border-2 border-primary/50"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-5xl mb-6"
            >
              ❤️
            </motion.div>
            <motion.h3
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="font-serif text-2xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-secondary leading-snug"
            >
              Mahi,<br />
              You are my favorite person,<br />
              my happiest memory,<br />
              and my greatest blessing.<br />
              <span className="text-primary">I love you ❤️</span>
            </motion.h3>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
