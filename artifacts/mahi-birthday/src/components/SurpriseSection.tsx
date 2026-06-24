import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export function SurpriseSection() {
  const [opened, setOpened] = useState(false);

  const handleSurprise = () => {
    setOpened(true);
    
    // Confetti explosion
    const duration = 5000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FF1493', '#8B5CF6', '#FFD700']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FF1493', '#8B5CF6', '#FFD700']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  return (
    <section className="py-32 px-4 flex justify-center items-center relative min-h-[50vh]">
      {!opened ? (
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleSurprise}
          className="relative px-12 py-6 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-serif text-2xl font-bold shadow-[0_0_40px_rgba(255,20,147,0.6)] hover:shadow-[0_0_60px_rgba(255,20,147,0.8)] transition-shadow overflow-hidden group"
        >
          <div className="absolute inset-0 bg-white/20 group-hover:translate-x-full -translate-x-full transition-transform duration-700 ease-in-out skew-x-12" />
          Open Your Surprise ❤️
        </motion.button>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            className="glass-panel p-8 md:p-12 rounded-3xl text-center max-w-2xl mx-auto relative z-20 box-glow border-2 border-primary/50"
          >
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="font-serif text-3xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-secondary leading-tight"
            >
              Mahi, You are my favorite person, my happiest memory, and my greatest blessing. I love you ❤️
            </motion.h3>
          </motion.div>
        </AnimatePresence>
      )}
    </section>
  );
}
