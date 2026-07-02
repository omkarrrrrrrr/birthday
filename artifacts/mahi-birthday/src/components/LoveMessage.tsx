import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { pauseBackgroundMusic, resumeBackgroundMusic } from '@/lib/musicController';

const lines = [
  { text: "HELLO MY BABUDIII / MY RASMALAIIIIII / MY JAAN / MY DARLING / MY ANGEL ❤️", style: "header" },
  { text: "FIRST OF ALL, HAPPIEST BIRTHDAY TO MY LOVE, MAHI! I LOVE YOU SO, SO MUCH — I CAN’T EVEN TELL YOU.", style: "lead" },
  { text: "YOU OWN A VERY, VERY SPECIAL PLACE IN MY HEART... OR RATHER, I SHOULD SAY YOU ARE MY WHOLE HEART.", style: "body" },
  { text: "I’M SO GRATEFUL TO HAVE YOU IN MY LIFE, AND I WANT YOU TO STAY WITH ME FOREVER.", style: "body" },
  { text: "I WANT US TO BUILD OUR FUTURE TOGETHER. I’VE NEVER FELT THIS LOVED BEFORE, AND THAT’S WHY I WANT TO DO EVERYTHING I CAN JUST TO SEE A SMILE ON YOUR FACE, TO MAKE YOU SHY, BLUSH, AND LAUGH.", style: "body" },
  { text: "ALSO, I KNOW YOU’LL ACHIEVE EVERYTHING YOU DESIRE IN LIFE.", style: "lead" },
  { text: "JUST STAY CONSISTENT AS YOU ARE, AND YOU’LL GET WHAT YOU WANT. I’M ALWAYS HERE TO SUPPORT YOU, ADORE YOU, AND APPRECIATE YOU.", style: "body" },
  { text: "STAY BLESSED, AND ONCE AGAIN, HAPPIEST BIRTHDAY TO THE LOVE OF MY LIFE.", style: "body" },
  { text: "I LOVE YOU INFINITE ❤️", style: "accent" },
  { text: "(PLEASE HUG ME TIGHTLY AFTER READING THIS 🥹)", style: "sign" },
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
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleVoiceNotePlay = () => {
    pauseBackgroundMusic();
  };

  const handleVoiceNoteEnd = () => {
    resumeBackgroundMusic();
  };

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

                {/* Voice Note */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 1.8 }}
                  className="pt-6"
                >
                  <p className="font-sans text-xs tracking-widest uppercase mb-4" style={{ color: 'hsl(36 28% 60%)' }}>
                    A voice note for you ❤️
                  </p>
                  <div
                    className="rounded-2xl p-5 relative mx-auto"
                    style={{
                      maxWidth: '320px',
                      background: 'linear-gradient(135deg, hsl(342 66% 24%), hsl(342 66% 18%))',
                      border: '1px solid hsl(342 66% 39% / 0.4)',
                      boxShadow: '0 8px 30px hsl(342 66% 39% / 0.2)',
                    }}
                  >
                    <div className="absolute top-3 left-3 w-4 h-4 border-l border-t rounded-tl-sm" style={{ borderColor: 'hsl(43 72% 44% / 0.5)' }} />
                    <div className="absolute top-3 right-3 w-4 h-4 border-r border-t rounded-tr-sm" style={{ borderColor: 'hsl(43 72% 44% / 0.5)' }} />
                    <div className="absolute bottom-3 left-3 w-4 h-4 border-l border-b rounded-bl-sm" style={{ borderColor: 'hsl(43 72% 44% / 0.5)' }} />
                    <div className="absolute bottom-3 right-3 w-4 h-4 border-r border-b rounded-br-sm" style={{ borderColor: 'hsl(43 72% 44% / 0.5)' }} />
                    
                    <audio
                      ref={audioRef}
                      src="/voicenote.mpeg"
                      controls
                      className="w-full"
                      style={{ 
                        filter: 'sepia(20%) saturate(70%) grayscale(10%)',
                      }}
                      onPlay={handleVoiceNotePlay}
                      onEnded={handleVoiceNoteEnd}
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
