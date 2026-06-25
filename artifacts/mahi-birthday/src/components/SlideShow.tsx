import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/* Instagram carousel slides — numbered in correct order, shown fully (object-contain) */
const slides = Array.from({ length: 12 }, (_, i) => `/slides/${i + 1}.webp`);

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
};

export function SlideShow() {
  const [[current, direction], setCurrent] = useState([0, 0]);
  const dragStart = useRef(0);

  const go = (next: number, dir: number) =>
    setCurrent([(next + slides.length) % slides.length, dir]);

  const prev = () => go(current - 1, -1);
  const next = () => go(current + 1, 1);

  return (
    <section className="relative w-full overflow-hidden py-20"
      style={{ background: 'linear-gradient(to bottom, hsl(242 38% 5%), hsl(244 30% 7%), hsl(242 38% 5%))' }}>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-10 px-6 max-w-sm mx-auto"
      >
        <p className="text-secondary text-xs tracking-[0.3em] uppercase mb-3 font-sans">From Omkar</p>
        <h2 className="font-serif text-4xl md:text-5xl text-foreground italic">
          My Favourite Frames
        </h2>
        <div className="gold-line w-28 mx-auto mt-5 mb-5" />
        <p className="font-serif italic text-sm leading-relaxed" style={{ color: 'hsl(36 28% 55%)' }}>
          Some moments I never want to forget — every one of these is a reason I smile.
        </p>
      </motion.div>

      {/* Viewer */}
      <div
        className="relative mx-auto px-4"
        style={{ maxWidth: 400 }}
        onTouchStart={(e) => { dragStart.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          const delta = dragStart.current - e.changedTouches[0].clientX;
          if (Math.abs(delta) > 45) delta > 0 ? next() : prev();
        }}
      >
        {/* Image frame — fixed height, contain so nothing is cut */}
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            height: '72vw',
            maxHeight: 380,
            background: 'hsl(244 28% 8%)',
            border: '1px solid hsl(342 66% 39% / 0.25)',
            boxShadow: '0 8px 60px hsl(342 66% 39% / 0.12)',
          }}
        >
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
              transition={{ duration: 0.38, ease: [0.32, 0.72, 0, 1] }}
              className="absolute inset-0 w-full h-full"
              style={{ objectFit: 'contain' }}
              draggable={false}
            />
          </AnimatePresence>

          {/* Slide counter */}
          <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full text-[11px] tracking-widest"
            style={{ background: 'rgba(8,6,20,0.7)', color: 'hsl(36 28% 80%)', border: '1px solid hsl(342 66% 39% / 0.3)' }}>
            {current + 1} / {slides.length}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-3 mt-5">
          <button
            onClick={prev}
            data-testid="button-slide-prev"
            className="flex-1 flex items-center justify-center gap-1.5 py-4 rounded-xl text-sm font-sans font-medium transition-all min-h-[52px] touch-manipulation"
            style={{
              background: 'hsl(244 28% 10%)',
              border: '1px solid hsl(342 66% 39% / 0.25)',
              color: 'hsl(36 28% 80%)',
            }}
          >
            <ChevronLeft size={18} />
            Prev
          </button>

          <button
            onClick={next}
            data-testid="button-slide-next"
            className="flex-1 flex items-center justify-center gap-1.5 py-4 rounded-xl text-sm font-sans font-medium transition-all min-h-[52px] touch-manipulation"
            style={{
              background: 'linear-gradient(135deg, hsl(342 66% 33%), hsl(342 66% 28%))',
              border: '1px solid hsl(342 66% 39% / 0.4)',
              color: 'hsl(36 28% 94%)',
              boxShadow: '0 4px 20px hsl(342 66% 39% / 0.25)',
            }}
          >
            Next
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-1.5 mt-5 pb-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i, i > current ? 1 : -1)}
              data-testid={`button-dot-${i}`}
              className="rounded-full transition-all duration-300 touch-manipulation"
              style={{
                width: i === current ? 22 : 6,
                height: 6,
                background: i === current
                  ? 'linear-gradient(to right, hsl(342 66% 45%), hsl(43 72% 44%))'
                  : 'hsl(36 28% 92% / 0.2)',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
