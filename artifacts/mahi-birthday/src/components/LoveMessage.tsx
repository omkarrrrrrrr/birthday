import { motion } from 'framer-motion';

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

export function LoveMessage() {
  return (
    <section className="py-24 px-5 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, hsl(342 66% 39% / 0.05) 0%, transparent 70%)' }} />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-14"
      >
        <p className="text-secondary text-xs tracking-[0.3em] uppercase mb-3 font-sans">A Letter</p>
        <h2 className="font-serif text-4xl md:text-5xl text-foreground italic">Words From the Heart</h2>
        <div className="gold-line w-28 mx-auto mt-5" />
      </motion.div>

      <div className="max-w-xl mx-auto glass-panel rounded-2xl p-8 md:p-12 relative">
        {/* Decorative corner lines */}
        <div className="absolute top-4 left-4 w-6 h-6 border-l border-t" style={{ borderColor: 'hsl(43 72% 44% / 0.4)' }} />
        <div className="absolute top-4 right-4 w-6 h-6 border-r border-t" style={{ borderColor: 'hsl(43 72% 44% / 0.4)' }} />
        <div className="absolute bottom-4 left-4 w-6 h-6 border-l border-b" style={{ borderColor: 'hsl(43 72% 44% / 0.4)' }} />
        <div className="absolute bottom-4 right-4 w-6 h-6 border-r border-b" style={{ borderColor: 'hsl(43 72% 44% / 0.4)' }} />

        <div className="space-y-5 text-center">
          {lines.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.8, delay: i * 0.12 }}
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
      </div>
    </section>
  );
}
