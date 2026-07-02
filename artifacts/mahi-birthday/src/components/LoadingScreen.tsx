import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { resumeBackgroundMusic } from '@/lib/musicController';

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [canEnter, setCanEnter] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer);
          setCanEnter(true);
          return 100;
        }
        return p + 2;
      });
    }, 28);
    return () => clearInterval(timer);
  }, [onComplete]);

  const handleEnter = () => {
    // This click interaction allows browsers to play audio
    resumeBackgroundMusic();
    onComplete();
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{ background: 'hsl(242 38% 5%)' }}
      exit={{ opacity: 0, scale: 1.04, filter: 'blur(12px)' }}
      transition={{ duration: 1.1, ease: 'easeInOut' }}
    >
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, hsl(342 66% 39% / 0.08) 0%, transparent 70%)' }} />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center relative z-10"
      >
        {/* Decorative top line */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: 48 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="gold-line mx-auto mb-8"
        />

        <p className="text-secondary text-xs tracking-[0.35em] uppercase mb-4 font-sans">
          A gift from Omkar
        </p>

        <h1 className="font-serif text-5xl md:text-7xl font-light italic mb-2"
          style={{ color: 'hsl(36 28% 92%)' }}>
          For Mahi
        </h1>
        <span className="text-2xl">❤️</span>

        {/* Progress bar */}
        <div className="w-48 h-px mt-12 mx-auto overflow-hidden rounded-full"
          style={{ background: 'hsl(36 28% 92% / 0.1)' }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: 'linear-gradient(90deg, hsl(342 66% 39%), hsl(43 72% 44%))' }}
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: 'easeOut' }}
          />
        </div>

        {/* Enter button - appears after loading completes */}
        {canEnter && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            onClick={handleEnter}
            className="mt-10 px-8 py-3 rounded-full font-serif text-lg italic touch-manipulation"
            style={{
              background: 'linear-gradient(135deg, hsl(342 66% 33%), hsl(342 66% 26%))',
              border: '1px solid hsl(342 66% 39% / 0.6)',
              color: 'hsl(36 28% 92%)',
              boxShadow: '0 0 30px hsl(342 66% 39% / 0.3)',
            }}
          >
            Click to Enter ❤️
          </motion.button>
        )}
      </motion.div>
    </motion.div>
  );
}
