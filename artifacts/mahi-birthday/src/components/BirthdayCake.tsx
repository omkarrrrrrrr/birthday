import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const wishes = [
  { icon: '🌟', text: 'May every dream you hold feel closer this year.' },
  { icon: '😄', text: 'May you laugh every single day without reason.' },
  { icon: '💪', text: 'May you always find strength, even on hard days.' },
  { icon: '🌸', text: 'May life give you beauty in the smallest moments.' },
  { icon: '❤️', text: 'May you always know how deeply you are loved.' },
];

function Flame({ out, onClick }: { out: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="relative flex flex-col items-center touch-manipulation"
      style={{ width: 28 }}
    >
      <AnimatePresence>
        {!out && (
          <motion.div
            key="flame"
            initial={{ scaleY: 1 }}
            exit={{ scaleY: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute"
            style={{ bottom: '100%', marginBottom: 2 }}
          >
            {/* outer glow */}
            <motion.div
              animate={{ scaleX: [1, 1.18, 0.88, 1], scaleY: [1, 0.88, 1.12, 1] }}
              transition={{ duration: 0.55, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 rounded-full blur-sm"
              style={{ background: 'hsl(43 100% 60% / 0.5)', transform: 'scale(1.6)' }}
            />
            {/* flame shape */}
            <motion.div
              animate={{ scaleX: [1, 1.15, 0.9, 1], scaleY: [1, 0.9, 1.1, 1] }}
              transition={{ duration: 0.55, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                width: 14, height: 22,
                background: 'linear-gradient(to top, hsl(20 100% 55%), hsl(43 100% 65%), hsl(50 100% 85%))',
                borderRadius: '50% 50% 30% 30% / 60% 60% 40% 40%',
                filter: 'drop-shadow(0 0 6px hsl(43 90% 60% / 0.8))',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Candle body */}
      <div style={{
        width: 14, height: 42,
        background: 'linear-gradient(135deg, hsl(342 66% 55%), hsl(342 66% 38%))',
        borderRadius: 4,
        boxShadow: 'inset -3px 0 6px rgba(0,0,0,0.25)',
        position: 'relative',
      }}>
        {/* wax drip */}
        <div style={{
          position: 'absolute', top: 6, right: -2, width: 5, height: 10,
          background: 'hsl(342 66% 62%)', borderRadius: '0 0 4px 4px',
        }} />
      </div>
    </button>
  );
}

export function BirthdayCake() {
  const [blown, setBlown] = useState<boolean[]>(Array(wishes.length).fill(false));
  const [revealedWish, setRevealedWish] = useState<number | null>(null);
  const allOut = blown.every(Boolean);
  const [celebrated, setCelebrated] = useState(false);

  const blowCandle = (i: number) => {
    if (blown[i]) return;
    const next = [...blown];
    next[i] = true;
    setBlown(next);
    setRevealedWish(i);

    if (next.every(Boolean) && !celebrated) {
      setCelebrated(true);
      setTimeout(() => {
        confetti({ particleCount: 120, spread: 90, origin: { y: 0.6 }, colors: ['#A8224B', '#C4951A', '#E8D5B0', '#fff'] });
      }, 400);
    }
  };

  return (
    <section className="py-20 px-4 w-full">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-10"
      >
        <p className="text-secondary text-xs tracking-[0.3em] uppercase mb-3 font-sans">Make a Wish</p>
        <h2 className="font-serif text-4xl md:text-5xl text-foreground italic">Blow the Candles</h2>
        <div className="gold-line w-28 mx-auto mt-5 mb-4" />
        <p className="font-serif italic text-sm" style={{ color: 'hsl(36 28% 50%)' }}>
          Tap each candle to reveal a birthday wish from Omkar ✨
        </p>
      </motion.div>

      <div className="max-w-sm mx-auto">
        {/* Cake */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center"
        >
          {/* Candles row */}
          <div className="flex items-end justify-center gap-4 mb-0 relative z-10">
            {wishes.map((_, i) => (
              <Flame key={i} out={blown[i]} onClick={() => blowCandle(i)} />
            ))}
          </div>

          {/* Top tier */}
          <div className="w-44 rounded-t-xl overflow-hidden relative" style={{ height: 52 }}>
            <div className="absolute inset-0" style={{
              background: 'linear-gradient(135deg, hsl(342 66% 32%), hsl(342 66% 25%))',
            }} />
            {/* frosting drips */}
            {[10, 30, 55, 75, 95].map((l, k) => (
              <div key={k} className="absolute top-0 rounded-b-full"
                style={{ left: `${l}%`, width: 14, height: 18, background: 'hsl(36 28% 88% / 0.35)' }} />
            ))}
            <p className="absolute inset-0 flex items-center justify-center font-serif italic text-sm"
              style={{ color: 'hsl(36 28% 78%)' }}>Happy Birthday</p>
          </div>

          {/* Bottom tier */}
          <div className="w-60 rounded-b-xl relative" style={{ height: 68 }}>
            <div className="absolute inset-0 rounded-b-xl" style={{
              background: 'linear-gradient(135deg, hsl(342 66% 28%), hsl(342 66% 20%))',
            }} />
            {/* frosting drips */}
            {[5, 22, 40, 58, 76, 90].map((l, k) => (
              <div key={k} className="absolute top-0 rounded-b-full"
                style={{ left: `${l}%`, width: 16, height: 22, background: 'hsl(36 28% 88% / 0.3)' }} />
            ))}
            {/* gold dots */}
            {[18, 38, 58, 78].map((l, k) => (
              <div key={k} className="absolute rounded-full"
                style={{ left: `${l}%`, top: '55%', width: 8, height: 8, background: 'hsl(43 72% 55%)', boxShadow: '0 0 8px hsl(43 72% 55% / 0.6)' }} />
            ))}
            <p className="absolute inset-0 flex items-end justify-center pb-3 font-serif italic text-base font-semibold"
              style={{ color: 'hsl(43 72% 60%)' }}>Mahi ❤️</p>
          </div>

          {/* Plate */}
          <div className="w-72 rounded-full mt-1" style={{ height: 12, background: 'linear-gradient(135deg, hsl(43 30% 30%), hsl(43 20% 22%))', boxShadow: '0 4px 20px rgba(0,0,0,0.4)' }} />
        </motion.div>

        {/* Wish reveal card */}
        <div className="mt-8" style={{ minHeight: 120 }}>
          <AnimatePresence mode="wait">
            {allOut ? (
              <motion.div
                key="all"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', damping: 14 }}
                className="glass-panel rounded-2xl p-6 text-center"
                style={{ border: '1px solid hsl(43 72% 44% / 0.4)' }}
              >
                <p className="text-3xl mb-3">🎉</p>
                <p className="font-serif italic text-xl mb-1" style={{ color: 'hsl(43 72% 60%)' }}>All wishes sent!</p>
                <p className="font-sans text-sm font-light" style={{ color: 'hsl(36 28% 55%)' }}>Every single one, straight from my heart.</p>
              </motion.div>
            ) : revealedWish !== null ? (
              <motion.div
                key={revealedWish}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4 }}
                className="glass-panel rounded-2xl p-6 text-center"
                style={{ border: '1px solid hsl(342 66% 39% / 0.25)' }}
              >
                <p className="text-3xl mb-3">{wishes[revealedWish].icon}</p>
                <p className="font-serif italic text-lg leading-relaxed" style={{ color: 'hsl(36 28% 86%)' }}>
                  {wishes[revealedWish].text}
                </p>
                <p className="text-xs mt-3 font-sans tracking-widest" style={{ color: 'hsl(342 66% 39% / 0.6)' }}>
                  {blown.filter(Boolean).length} of {wishes.length} candles blown
                </p>
              </motion.div>
            ) : (
              <motion.p
                key="hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center font-serif italic text-sm"
                style={{ color: 'hsl(36 28% 40%)' }}
              >
                Tap a candle to begin ✨
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
