import { motion } from 'framer-motion';

const lines = [
  "Dear Mahi,",
  "Happy Birthday to the most beautiful person in my life.",
  "Every smile of yours feels like sunshine.",
  "Every conversation becomes a memory.",
  "Every moment with you becomes special.",
  "Thank you for bringing happiness into my life and making ordinary days unforgettable.",
  "I wish you endless happiness, success, laughter and love.",
  "No matter what happens, you'll always hold a special place in my heart.",
  "Happy Birthday ❤️",
  "Forever yours,",
  "Omkar"
];

export function LoveMessage() {
  return (
    <section className="py-40 px-4 min-h-screen flex items-center bg-black/60 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background z-0" />
      
      <div className="max-w-3xl mx-auto text-center relative z-10 space-y-8">
        {lines.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1, delay: i * 0.2 }}
            className={`font-serif text-xl md:text-3xl text-white/90 leading-relaxed ${
              i === 0 || i === lines.length - 2 || i === lines.length - 1 ? 'font-bold text-primary' : ''
            }`}
          >
            {line}
          </motion.p>
        ))}
      </div>
    </section>
  );
}
