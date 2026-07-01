import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const lines = [
  { text: "Dear Mahi,", style: "header" },
  { text: "Happy Birthday to the most beautiful person in my life.", style: "lead" },
  { text: "Every smile of yours feels like sunshine.", style: "body" },
  { text: "Every conversation becomes a memory.", style: "body" },
  { text: "Every moment with you becomes special.", style: "body" },
  { text: "Thank you for bringing happiness into my life and making ordinary days unforgettable.", style: "lead" },
  { text: "I wish you endless happiness, success, laughter and love.", style: "body" },
  { text: "No matter what happens, you'll always hold a special place in my heart.", style: "body" },
  { text: "Happy Birthday ❤️", style: "accent" },
  { text: "Forever yours,", style: "sign" },
  { text: "Omkar", style: "name" },
];

function EnvelopeFlap({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 280 90" className="w-full" style={{ display: 'block' }}>
      <motion.path
        d="M 0 90 L 140 0 L 280 90"
        fill="hsl(342 66% 26%)"
        stroke="hsl(342 66% 39% / 0.4)"
        strokeWidth="1"
        initial={{ rotateX: 0 }}
        animate={{ rotateX: open ? -175 : 0 }}
        transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
        style={{ transformOrigin: 'top', transformBox: 'fill-box' }}
      />
      {/* gold seal */}
      {!open && (
        <circle cx="140" cy="75" r="14" fill="hsl(43 72% 44%)"
          stroke="hsl(43 72% 60% / 0.4)" strokeWidth="1.5" />
      )}
      {!open && (
        <text x="140" y="80" textAnchor="middle" fontSize="14" fill="hsl(242 38% 5%)">❤</text>
      )}
    </svg>
  );
}

export function LoveMessage() {
  const [opened, setOpened] = useState(false);

  return (
    <section className="py-20 px-5 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, hsl(342 66% 39% / 0.04) 0%, transparent 70%)' }} />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <p className="text-secondary text-xs tracking-[0.3em] uppercase mb-3 font-sans">A Letter</p>
        <h2 className="font-serif text-4xl md:text-5xl text-foreground italic">Words From the Heart</h2>
        <div className="gold-line w-28 mx-auto mt-5" />
      </motion.div>

      <div className="max-w-sm mx-auto">
        <AnimatePresence mode="wait">
          {!opened ? (
            /* ── Sealed envelope ── */
            <motion.div
              key="envelope"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="cursor-pointer"
              onClick={() => setOpened(true)}
            >
              {/* Envelope body */}
              <motion.div
                whileTap={{ scale: 0.97 }}
                className="relative rounded-2xl overflow-hidden touch-manipulation"
                style={{
                  background: 'linear-gradient(135deg, hsl(342 66% 24%), hsl(342 66% 18%))',
                  border: '1px solid hsl(342 66% 39% / 0.4)',
                  boxShadow: '0 8px 50px hsl(342 66% 39% / 0.18)',
                }}
              >
                {/* Flap */}
                <EnvelopeFlap open={false} />

                {/* Body */}
                <div className="px-8 py-8 text-center">
                  <p className="font-serif italic text-lg mb-2" style={{ color: 'hsl(36 28% 78%)' }}>
                    A letter for Mahi
                  </p>
                  <p className="font-sans text-xs tracking-widest uppercase" style={{ color: 'hsl(36 28% 45%)' }}>
                    Tap to open ❤️
                  </p>
                </div>

                {/* Bottom triangles */}
                <div className="relative overflow-hidden" style={{ height: 50 }}>
                  <div className="absolute inset-0 flex">
                    <div style={{ flex: 1, background: 'hsl(342 66% 22%)', clipPath: 'polygon(0 0, 100% 100%, 0 100%)' }} />
                    <div style={{ flex: 1, background: 'hsl(342 66% 20%)', clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }} />
                  </div>
                </div>
              </motion.div>

              <p className="text-center mt-4 font-sans text-xs" style={{ color: 'hsl(36 28% 35%)' }}>
                From Omkar, with love
              </p>
            </motion.div>
          ) : (
            /* ── Open letter ── */
            <motion.div
              key="letter"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, type: 'spring', damping: 18 }}
              className="glass-panel rounded-2xl p-8 md:p-10 relative"
              style={{ border: '1px solid hsl(342 66% 39% / 0.3)' }}
            >
              {/* Corner details */}
              <div className="absolute top-4 left-4 w-6 h-6 border-l border-t" style={{ borderColor: 'hsl(43 72% 44% / 0.4)' }} />
              <div className="absolute top-4 right-4 w-6 h-6 border-r border-t" style={{ borderColor: 'hsl(43 72% 44% / 0.4)' }} />
              <div className="absolute bottom-4 left-4 w-6 h-6 border-l border-b" style={{ borderColor: 'hsl(43 72% 44% / 0.4)' }} />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-r border-b" style={{ borderColor: 'hsl(43 72% 44% / 0.4)' }} />

              <div className="space-y-5 text-center">
                {lines.map((line, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 + i * 0.1 }}
                    className={
                      line.style === 'header' ? 'font-serif text-2xl italic font-semibold' :
                      line.style === 'lead'   ? 'font-serif text-lg italic leading-relaxed' :
                      line.style === 'accent' ? 'font-serif text-2xl italic font-semibold' :
                      line.style === 'sign'   ? 'font-serif text-base italic mt-6' :
                      line.style === 'name'   ? 'font-serif text-2xl italic font-semibold' :
                      'font-sans text-sm font-light leading-relaxed'
                    }
                    style={{
                      color: line.style === 'header' || line.style === 'accent' || line.style === 'name'
                        ? 'hsl(342 66% 55%)'
                        : line.style === 'sign'
                        ? 'hsl(36 28% 70%)'
                        : 'hsl(36 28% 82%)',
                    }}
                  >
                    {line.text}
                  </motion.p>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
