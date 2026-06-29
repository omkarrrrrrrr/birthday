import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const reasons = [
  {
    number: '01',
    text: 'The way you smile when something genuinely makes you happy — it lights up everything around you.',
  },
  {
    number: '02',
    text: 'How you make even the most ordinary moments feel like they actually matter.',
  },
  {
    number: '03',
    text: 'Your laugh. I could listen to it on repeat and never get tired of it.',
  },
  {
    number: '04',
    text: 'The way you care — quietly, deeply, without making a big deal of it.',
  },
  {
    number: '05',
    text: "How strong you are, even on the days you don't feel like it.",
  },
  {
    number: '06',
    text: "The warmth you carry with you everywhere, even when you don't notice it yourself.",
  },
  {
    number: '07',
    text: 'Every little thing you do without realising just how beautiful it is.',
  },
  {
    number: '08',
    text: "That you chose me back. That's the one I'll never stop being grateful for.",
  },
];

export function LoveReasons() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [started, setStarted] = useState(false);
  const done = index >= reasons.length;

  const next = () => {
    setDir(1);
    setIndex((i) => i + 1);
  };

  const restart = () => {
    setDir(-1);
    setIndex(0);
  };

  return (
    <section className="py-20 px-4 w-full">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <p className="text-secondary text-xs tracking-[0.3em] uppercase mb-3 font-sans">
          Written by Omkar
        </p>
        <h2 className="font-serif text-4xl md:text-5xl text-foreground italic">
          Things I Love About You
        </h2>
        <div className="gold-line w-36 mx-auto mt-5" />
      </motion.div>

      <div className="max-w-sm mx-auto">
        {!started ? (
          /* Start button */
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <p className="font-serif italic text-base mb-8" style={{ color: 'hsl(36 28% 55%)' }}>
              Tap to discover the reasons ❤️
            </p>
            <button
              onClick={() => setStarted(true)}
              className="px-10 py-4 rounded-full font-serif italic text-lg touch-manipulation transition-all"
              style={{
                background: 'linear-gradient(135deg, hsl(342 66% 30%), hsl(342 66% 24%))',
                border: '1px solid hsl(342 66% 39% / 0.5)',
                color: 'hsl(36 28% 92%)',
                boxShadow: '0 4px 30px hsl(342 66% 39% / 0.18)',
              }}
            >
              Begin
            </button>
          </motion.div>
        ) : (
          <div>
            {/* Card */}
            <div className="relative" style={{ minHeight: 260 }}>
              <AnimatePresence mode="wait" custom={dir}>
                {!done ? (
                  <motion.div
                    key={index}
                    custom={dir}
                    variants={{
                      enter: (d: number) => ({ x: d > 0 ? 60 : -60, opacity: 0 }),
                      center: { x: 0, opacity: 1 },
                      exit:  (d: number) => ({ x: d > 0 ? -60 : 60, opacity: 0 }),
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.42, ease: [0.32, 0.72, 0, 1] }}
                    className="glass-panel rounded-2xl p-8 text-center relative overflow-hidden"
                    style={{ border: '1px solid hsl(342 66% 39% / 0.22)' }}
                  >
                    {/* Corner ornaments */}
                    <div className="absolute top-3 left-3 w-4 h-4 border-l border-t" style={{ borderColor: 'hsl(43 72% 44% / 0.5)' }} />
                    <div className="absolute top-3 right-3 w-4 h-4 border-r border-t" style={{ borderColor: 'hsl(43 72% 44% / 0.5)' }} />
                    <div className="absolute bottom-3 left-3 w-4 h-4 border-l border-b" style={{ borderColor: 'hsl(43 72% 44% / 0.5)' }} />
                    <div className="absolute bottom-3 right-3 w-4 h-4 border-r border-b" style={{ borderColor: 'hsl(43 72% 44% / 0.5)' }} />

                    {/* Number */}
                    <p className="font-serif text-5xl font-light leading-none mb-4"
                      style={{ color: 'hsl(342 66% 39% / 0.25)', letterSpacing: '-0.02em' }}>
                      {reasons[index].number}
                    </p>

                    {/* Big decorative quote mark */}
                    <p className="font-serif text-4xl leading-none mb-2" style={{ color: 'hsl(43 72% 44% / 0.5)' }}>❝</p>

                    <p className="font-serif italic text-xl leading-relaxed" style={{ color: 'hsl(36 28% 86%)' }}>
                      {reasons[index].text}
                    </p>
                  </motion.div>
                ) : (
                  /* Final message */
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, type: 'spring', damping: 14 }}
                    className="glass-panel rounded-2xl p-8 text-center relative overflow-hidden"
                    style={{ border: '1px solid hsl(342 66% 39% / 0.3)' }}
                  >
                    <div className="absolute top-3 left-3 w-4 h-4 border-l border-t" style={{ borderColor: 'hsl(43 72% 44% / 0.5)' }} />
                    <div className="absolute top-3 right-3 w-4 h-4 border-r border-t" style={{ borderColor: 'hsl(43 72% 44% / 0.5)' }} />
                    <div className="absolute bottom-3 left-3 w-4 h-4 border-l border-b" style={{ borderColor: 'hsl(43 72% 44% / 0.5)' }} />
                    <div className="absolute bottom-3 right-3 w-4 h-4 border-r border-b" style={{ borderColor: 'hsl(43 72% 44% / 0.5)' }} />

                    <motion.p
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-4xl mb-5"
                    >❤️</motion.p>
                    <p className="font-serif italic text-2xl mb-3" style={{ color: 'hsl(342 66% 55%)' }}>
                      And so much more, Mahi.
                    </p>
                    <p className="font-sans font-light text-sm" style={{ color: 'hsl(36 28% 50%)' }}>
                      This list could never be long enough.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Progress dots + button */}
            <div className="flex items-center justify-between mt-6">
              {/* Dots */}
              <div className="flex items-center gap-1.5">
                {reasons.map((_, i) => (
                  <div key={i} className="rounded-full transition-all duration-300"
                    style={{
                      width: i === index ? 18 : 5,
                      height: 5,
                      background: i < index
                        ? 'hsl(342 66% 39% / 0.5)'
                        : i === index
                        ? 'linear-gradient(to right, hsl(342 66% 45%), hsl(43 72% 44%))'
                        : 'hsl(36 28% 92% / 0.12)',
                    }}
                  />
                ))}
              </div>

              {/* Action button */}
              {!done ? (
                <button
                  onClick={next}
                  data-testid="button-reason-next"
                  className="px-6 py-3 rounded-full font-sans text-sm font-medium touch-manipulation transition-all"
                  style={{
                    background: 'linear-gradient(135deg, hsl(342 66% 32%), hsl(342 66% 26%))',
                    border: '1px solid hsl(342 66% 39% / 0.4)',
                    color: 'hsl(36 28% 92%)',
                    boxShadow: '0 4px 20px hsl(342 66% 39% / 0.2)',
                  }}
                >
                  {index === reasons.length - 1 ? 'Finish ❤️' : 'Next →'}
                </button>
              ) : (
                <button
                  onClick={restart}
                  data-testid="button-reason-restart"
                  className="px-6 py-3 rounded-full font-sans text-sm font-medium touch-manipulation"
                  style={{
                    background: 'hsl(244 28% 10%)',
                    border: '1px solid hsl(342 66% 39% / 0.2)',
                    color: 'hsl(36 28% 60%)',
                  }}
                >
                  Read again
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
