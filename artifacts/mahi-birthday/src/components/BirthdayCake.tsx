import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

/* ── First 4 candles: personalised wishes ── */
const wishes = [
  {
    icon: '🚀',
    text: 'May you reach your goals faster than you ever thought possible — success is already written for you, Mahi.',
  },
  {
    icon: '🎬',
    text: 'May your content creation journey explode — the world deserves to see you, and it will.',
  },
  {
    icon: '✈️',
    text: 'May we explore every city on our list together, just you and me, seeing the whole world hand in hand.',
  },
  {
    icon: '💫',
    text: 'May every single birthday ahead be bigger, brighter, and more beautiful than this one.',
  },
];

const milestones = [
  { label: 'Sometime', value: 0, response: "Even a little while with you means everything to me. 🥂" },
  { label: 'A bit more', value: 1, response: "A bit more — I'll make every single moment count. 💛" },
  { label: 'Much more', value: 2, response: "Much more time together. Now we're talking. ❤️" },
  { label: 'Forever', value: 3, response: "Forever it is. That's all I needed to hear. ❤️‍🔥" },
];

function Flame({ out, onClick }: { out: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className="relative flex flex-col items-center touch-manipulation" style={{ width: 28 }}>
      <AnimatePresence>
        {!out && (
          <motion.div
            key="flame"
            initial={{ scaleY: 1, opacity: 1 }}
            exit={{ scaleY: 0, opacity: 0, y: -6 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="absolute"
            style={{ bottom: '100%', marginBottom: 2 }}
          >
            <motion.div
              animate={{ scaleX: [1, 1.18, 0.88, 1], scaleY: [1, 0.9, 1.1, 1] }}
              transition={{ duration: 0.55, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 rounded-full blur-sm opacity-60"
              style={{ background: 'hsl(43 100% 60%)', transform: 'scale(1.7)' }}
            />
            <motion.div
              animate={{ scaleX: [1, 1.14, 0.9, 1], scaleY: [1, 0.92, 1.08, 1] }}
              transition={{ duration: 0.55, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                width: 14, height: 22,
                background: 'linear-gradient(to top, hsl(20 100% 55%), hsl(43 100% 65%), hsl(50 100% 88%))',
                borderRadius: '50% 50% 30% 30% / 60% 60% 40% 40%',
                filter: 'drop-shadow(0 0 7px hsl(43 90% 60% / 0.9))',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      {/* Candle */}
      <div style={{
        width: 14, height: 42,
        background: 'linear-gradient(135deg, hsl(342 66% 55%), hsl(342 66% 38%))',
        borderRadius: 4, boxShadow: 'inset -3px 0 6px rgba(0,0,0,0.25)', position: 'relative',
      }}>
        <div style={{ position: 'absolute', top: 6, right: -2, width: 5, height: 10, background: 'hsl(342 66% 62%)', borderRadius: '0 0 4px 4px' }} />
      </div>
    </button>
  );
}

/* ── Special 5th candle: wish slider ── */
function WishSlider({ onChoose }: { onChoose: (label: string) => void }) {
  const [chosen, setChosen] = useState<number | null>(null);
  const [sliderVal, setSliderVal] = useState(0);

  const handleSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    setSliderVal(v);
  };

  const handleConfirm = () => {
    const m = milestones[sliderVal];
    setChosen(sliderVal);
    onChoose(m.response);
    if (sliderVal === 3) {
      setTimeout(() => {
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.5 }, colors: ['#A8224B', '#C4951A', '#E8D5B0', '#fff'] });
      }, 200);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-panel rounded-2xl p-6 text-center"
      style={{ border: '1px solid hsl(43 72% 44% / 0.4)' }}
    >
      <p className="text-2xl mb-2">🎯</p>
      <p className="font-serif italic text-lg mb-1" style={{ color: 'hsl(36 28% 86%)' }}>
        Make a Wish, Mahi
      </p>
      <p className="font-sans text-xs mb-6" style={{ color: 'hsl(36 28% 48%)' }}>
        How long do you want to be with Omkar?
      </p>

      {chosen === null ? (
        <>
          {/* Milestone labels */}
          <div className="flex justify-between px-1 mb-2">
            {milestones.map((m, i) => (
              <span key={i} className="text-[10px] font-sans transition-all duration-200"
                style={{
                  color: sliderVal === i ? 'hsl(43 72% 55%)' : 'hsl(36 28% 38%)',
                  fontWeight: sliderVal === i ? '600' : '300',
                }}>
                {m.label}
              </span>
            ))}
          </div>

          {/* Slider */}
          <div className="relative px-1 mb-5">
            <input
              type="range"
              min={0}
              max={3}
              step={1}
              value={sliderVal}
              onChange={handleSlider}
              className="w-full touch-manipulation"
              style={{
                WebkitAppearance: 'none',
                appearance: 'none',
                height: 4,
                borderRadius: 2,
                background: `linear-gradient(to right, hsl(342 66% 45%) ${(sliderVal / 3) * 100}%, hsl(36 28% 92% / 0.15) ${(sliderVal / 3) * 100}%)`,
                outline: 'none',
                cursor: 'pointer',
              }}
            />
          </div>

          {/* Current milestone highlight */}
          <motion.div
            key={sliderVal}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-5 py-2 px-4 rounded-full inline-block"
            style={{
              background: sliderVal === 3 ? 'hsl(342 66% 32% / 0.5)' : 'hsl(244 28% 10%)',
              border: `1px solid ${sliderVal === 3 ? 'hsl(342 66% 50% / 0.6)' : 'hsl(36 28% 92% / 0.1)'}`,
            }}
          >
            <span className="font-serif italic text-base" style={{ color: sliderVal === 3 ? 'hsl(342 66% 65%)' : 'hsl(36 28% 78%)' }}>
              {milestones[sliderVal].label} {sliderVal === 3 ? '❤️‍🔥' : ''}
            </span>
          </motion.div>

          <br />
          <button
            onClick={handleConfirm}
            className="px-8 py-3 rounded-full font-sans text-sm font-medium touch-manipulation"
            style={{
              background: 'linear-gradient(135deg, hsl(342 66% 32%), hsl(342 66% 26%))',
              border: '1px solid hsl(342 66% 39% / 0.5)',
              color: 'hsl(36 28% 92%)',
              boxShadow: '0 4px 20px hsl(342 66% 39% / 0.2)',
            }}
          >
            Confirm my wish ✨
          </button>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', damping: 14 }}
        >
          <p className="font-serif italic text-xl leading-relaxed" style={{ color: 'hsl(342 66% 60%)' }}>
            {milestones[chosen].response}
          </p>
          {chosen === 3 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-3 font-sans text-xs"
              style={{ color: 'hsl(43 72% 50%)' }}
            >
              Forever starts right now. ❤️
            </motion.p>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}

export function BirthdayCake() {
  const [blown, setBlown] = useState<boolean[]>(Array(5).fill(false));
  const [revealedWish, setRevealedWish] = useState<number | null>(null);
  const [wishResponse, setWishResponse] = useState<string | null>(null);
  const [celebrated, setCelebrated] = useState(false);

  const allOut = blown.every(Boolean);

  const blowCandle = (i: number) => {
    if (blown[i]) return;
    const next = [...blown];
    next[i] = true;
    setBlown(next);
    if (i < 4) setRevealedWish(i);
    else setRevealedWish(4); // trigger slider

    if (next.every(Boolean) && !celebrated) {
      setCelebrated(true);
      setTimeout(() => {
        confetti({ particleCount: 130, spread: 90, origin: { y: 0.55 }, colors: ['#A8224B', '#C4951A', '#E8D5B0', '#fff'] });
      }, 500);
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
          Tap each candle — the last one is special ✨
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
            {Array(5).fill(0).map((_, i) => (
              <Flame key={i} out={blown[i]} onClick={() => blowCandle(i)} />
            ))}
          </div>

          {/* Top tier */}
          <div className="w-48 rounded-t-xl overflow-hidden relative" style={{ height: 52 }}>
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, hsl(342 66% 32%), hsl(342 66% 25%))' }} />
            {[8, 28, 50, 72, 92].map((l, k) => (
              <div key={k} className="absolute top-0 rounded-b-full"
                style={{ left: `${l}%`, width: 14, height: 18, background: 'hsl(36 28% 88% / 0.3)' }} />
            ))}
            <p className="absolute inset-0 flex items-center justify-center font-serif italic text-sm"
              style={{ color: 'hsl(36 28% 78%)' }}>Happy Birthday</p>
          </div>

          {/* Bottom tier */}
          <div className="w-64 rounded-b-xl relative" style={{ height: 68 }}>
            <div className="absolute inset-0 rounded-b-xl" style={{ background: 'linear-gradient(135deg, hsl(342 66% 28%), hsl(342 66% 20%))' }} />
            {[5, 22, 40, 58, 76, 92].map((l, k) => (
              <div key={k} className="absolute top-0 rounded-b-full"
                style={{ left: `${l}%`, width: 16, height: 22, background: 'hsl(36 28% 88% / 0.28)' }} />
            ))}
            {[16, 36, 56, 76].map((l, k) => (
              <div key={k} className="absolute rounded-full"
                style={{ left: `${l}%`, top: '50%', width: 8, height: 8, background: 'hsl(43 72% 55%)', boxShadow: '0 0 8px hsl(43 72% 55% / 0.6)' }} />
            ))}
            <p className="absolute inset-0 flex items-end justify-center pb-3 font-serif italic text-base font-semibold"
              style={{ color: 'hsl(43 72% 60%)' }}>Mahi ❤️</p>
          </div>

          {/* Plate */}
          <div className="w-72 rounded-full mt-1"
            style={{ height: 12, background: 'linear-gradient(135deg, hsl(43 30% 30%), hsl(43 20% 22%))', boxShadow: '0 4px 20px rgba(0,0,0,0.4)' }} />
        </motion.div>

        {/* Wish / Slider reveal */}
        <div className="mt-8" style={{ minHeight: 130 }}>
          <AnimatePresence mode="wait">
            {/* All candles out */}
            {allOut && revealedWish !== 4 && (
              <motion.div key="all"
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', damping: 14 }}
                className="glass-panel rounded-2xl p-6 text-center"
                style={{ border: '1px solid hsl(43 72% 44% / 0.4)' }}
              >
                <p className="text-3xl mb-3">🎉</p>
                <p className="font-serif italic text-xl mb-1" style={{ color: 'hsl(43 72% 60%)' }}>All wishes sent!</p>
                <p className="font-sans text-sm font-light" style={{ color: 'hsl(36 28% 55%)' }}>Every single one, straight from my heart.</p>
              </motion.div>
            )}

            {/* Candles 0–3: personalised wish */}
            {revealedWish !== null && revealedWish < 4 && !blown[4] && (
              <motion.div key={revealedWish}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="glass-panel rounded-2xl p-6 text-center"
                style={{ border: '1px solid hsl(342 66% 39% / 0.25)' }}
              >
                <p className="text-3xl mb-3">{wishes[revealedWish].icon}</p>
                <p className="font-serif italic text-lg leading-relaxed" style={{ color: 'hsl(36 28% 86%)' }}>
                  {wishes[revealedWish].text}
                </p>
                <p className="text-xs mt-3 font-sans tracking-widest" style={{ color: 'hsl(342 66% 39% / 0.6)' }}>
                  {blown.filter(Boolean).length} of 5 — tap the next one ✨
                </p>
              </motion.div>
            )}

            {/* Candle 5: interactive wish slider */}
            {revealedWish === 4 && (
              <motion.div key="slider"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <WishSlider onChoose={setWishResponse} />
              </motion.div>
            )}

            {/* No candle blown yet */}
            {revealedWish === null && (
              <motion.p key="hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center font-serif italic text-sm py-6"
                style={{ color: 'hsl(36 28% 38%)' }}
              >
                Tap a candle to begin ✨
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Custom slider thumb styling */}
      <style>{`
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 22px; height: 22px;
          border-radius: 50%;
          background: linear-gradient(135deg, hsl(342, 66%, 50%), hsl(43, 72%, 50%));
          box-shadow: 0 0 12px hsl(342 66% 39% / 0.5);
          cursor: pointer;
          border: 2px solid hsl(36 28% 88%);
        }
        input[type='range']::-moz-range-thumb {
          width: 22px; height: 22px;
          border-radius: 50%;
          background: linear-gradient(135deg, hsl(342, 66%, 50%), hsl(43, 72%, 50%));
          box-shadow: 0 0 12px hsl(342 66% 39% / 0.5);
          cursor: pointer;
          border: 2px solid hsl(36 28% 88%);
        }
      `}</style>
    </section>
  );
}
