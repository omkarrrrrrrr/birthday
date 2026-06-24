import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  '/slides/719008875_17976353466044262_2375902839987223164_n.webp',
  '/slides/719009009_17976353457044262_3399814665857040023_n.webp',
  '/slides/719009705_17976353475044262_2027973676093718324_n.webp',
  '/slides/719483234_17976353490044262_8664727810978777395_n.webp',
  '/slides/719658964_17976353412044262_4978992397195635519_n.webp',
  '/slides/720010879_17976353430044262_406997745114523242_n.webp',
  '/slides/720075311_17976353493044262_3374479350093775300_n.webp',
  '/slides/720227304_17976353439044262_8055818310746945370_n.webp',
  '/slides/720475112_17976353448044262_7760811604931965574_n.webp',
  '/slides/720475128_17976353427044262_6447538757338885851_n.webp',
  '/slides/720588272_17976353502044262_5475694374578136107_n.webp',
  '/slides/720712321_17976353511044262_1362236856784668047_n.webp',
];

const variants = {
  enter: (dir: number) => ({
    x: dir > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({
    x: dir > 0 ? '-100%' : '100%',
    opacity: 0,
  }),
};

export function SlideShow() {
  const [[current, direction], setCurrent] = useState([0, 0]);
  const dragStartX = useRef(0);

  const go = (next: number, dir: number) => {
    const clamped = (next + slides.length) % slides.length;
    setCurrent([clamped, dir]);
  };

  const prev = () => go(current - 1, -1);
  const next = () => go(current + 1, 1);

  const onTouchStart = (e: React.TouchEvent) => {
    dragStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    const delta = dragStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) {
      delta > 0 ? next() : prev();
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-black">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center pt-16 pb-8 px-4"
      >
        <h2 className="font-serif text-3xl md:text-5xl text-white mb-3">
          Our{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
            Story
          </span>{' '}
          ❤️
        </h2>
        <p className="text-white/50 text-sm tracking-widest uppercase">Swipe or tap to explore</p>
        <div className="w-16 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto mt-4 rounded-full" />
      </motion.div>

      {/* Slide viewer */}
      <div
        className="relative w-full mx-auto"
        style={{ maxWidth: 420 }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Image container */}
        <div className="relative overflow-hidden rounded-2xl mx-4 shadow-[0_0_60px_rgba(255,20,147,0.25)]"
          style={{ aspectRatio: '9/16' }}>
          <AnimatePresence custom={direction} mode="popLayout">
            <motion.img
              key={current}
              src={slides[current]}
              alt={`Slide ${current + 1}`}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
              className="absolute inset-0 w-full h-full object-cover"
              draggable={false}
            />
          </AnimatePresence>

          {/* Gradient overlay at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />

          {/* Slide counter inside image */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 text-white/80 text-xs tracking-widest pointer-events-none">
            {current + 1} / {slides.length}
          </div>
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center justify-center gap-6 mt-6 mb-4 px-4">
          <button
            onClick={prev}
            data-testid="button-slide-prev"
            className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl bg-white/10 hover:bg-white/20 active:bg-white/30 border border-white/20 text-white transition-colors min-h-[52px] touch-manipulation"
          >
            <ChevronLeft size={22} />
            <span className="font-medium text-sm">Previous</span>
          </button>

          <button
            onClick={next}
            data-testid="button-slide-next"
            className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 active:opacity-80 text-white transition-all shadow-[0_0_20px_rgba(255,20,147,0.4)] min-h-[52px] touch-manipulation"
          >
            <span className="font-medium text-sm">Next</span>
            <ChevronRight size={22} />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-1.5 pb-8">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i, i > current ? 1 : -1)}
              data-testid={`button-dot-${i}`}
              className="transition-all duration-300 rounded-full touch-manipulation"
              style={{
                width: i === current ? 20 : 6,
                height: 6,
                background: i === current
                  ? 'linear-gradient(to right, #FF1493, #8B5CF6)'
                  : 'rgba(255,255,255,0.25)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
