import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

/* ── swap this path when you upload the surprise video ── */
const SURPRISE_VIDEO = '/surprise-video.mp4';

export function SurpriseSection() {
  const [opened, setOpened] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleSurprise = () => {
    setOpened(true);

    /* confetti burst */
    const end = Date.now() + 4000;
    const burst = () => {
      confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0, y: 0.7 }, colors: ['#A8224B', '#C4951A', '#E8D5B0'] });
      confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1, y: 0.7 }, colors: ['#A8224B', '#C4951A', '#E8D5B0'] });
      if (Date.now() < end) requestAnimationFrame(burst);
    };
    burst();

    /* auto-play the video once it's in the DOM */
    setTimeout(() => { videoRef.current?.play().catch(() => {}); }, 300);
  };

  return (
    <section className="py-24 px-4 flex flex-col items-center relative min-h-[60dvh]">
      {/* Header */}
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
          /* ── Button ── */
          <motion.button
            key="btn"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileTap={{ scale: 0.96 }}
            onClick={handleSurprise}
            data-testid="button-surprise"
            className="relative px-10 py-5 rounded-full font-serif text-xl italic font-semibold overflow-hidden touch-manipulation min-h-[56px]"
            style={{
              background: 'linear-gradient(135deg, hsl(342 66% 33%), hsl(342 66% 26%))',
              border: '1px solid hsl(342 66% 39% / 0.6)',
              color: 'hsl(36 28% 92%)',
              boxShadow: '0 0 40px hsl(342 66% 39% / 0.2)',
            }}
          >
            Open Your Surprise ❤️
          </motion.button>
        ) : (
          /* ── Revealed ── */
          <motion.div
            key="reveal"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: 'spring', damping: 15 }}
            className="w-full max-w-sm mx-auto space-y-5"
          >
            {/* Video player */}
            <div
              className="rounded-2xl overflow-hidden relative"
              style={{
                background: '#000',
                border: '1px solid hsl(342 66% 39% / 0.3)',
                boxShadow: '0 8px 50px hsl(342 66% 39% / 0.18)',
              }}
            >
              <video
                ref={videoRef}
                src={SURPRISE_VIDEO}
                playsInline
                controls
                preload="metadata"
                className="w-full block"
                style={{ objectFit: 'contain', maxHeight: '65dvh', background: '#000' }}
              />
            </div>

            {/* Love message below video */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-panel p-6 rounded-2xl text-center relative"
              style={{ border: '1px solid hsl(342 66% 39% / 0.3)' }}
            >
              <div className="absolute top-3 left-3 w-4 h-4 border-l border-t" style={{ borderColor: 'hsl(43 72% 44% / 0.5)' }} />
              <div className="absolute top-3 right-3 w-4 h-4 border-r border-t" style={{ borderColor: 'hsl(43 72% 44% / 0.5)' }} />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-l border-b" style={{ borderColor: 'hsl(43 72% 44% / 0.5)' }} />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-r border-b" style={{ borderColor: 'hsl(43 72% 44% / 0.5)' }} />

              <motion.p className="text-3xl mb-4"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 1.8, repeat: Infinity }}>❤️</motion.p>

              <p className="font-serif text-xl italic leading-snug" style={{ color: 'hsl(36 28% 90%)' }}>
                Mahi,<br />
                <span style={{ color: 'hsl(342 66% 55%)' }}>you are my favorite person,</span><br />
                my happiest memory,<br />
                and my greatest blessing.
              </p>
              <p className="font-serif text-lg italic mt-3" style={{ color: 'hsl(43 72% 55%)' }}>
                I love you ❤️
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
