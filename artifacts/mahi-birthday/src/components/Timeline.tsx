import { motion } from 'framer-motion';

const timeline = [
  { date: "Day 1", text: "The day I first saw you — my world changed forever" },
  { date: "Everyday", text: "Every coffee with you is my favorite hour" },
  { date: "Always", text: "You make ordinary days feel magical" },
  { date: "22 May 2026", text: "A moment to remember always 💕" },
  { date: "4 June 2026", text: "That day I'll never forget ❤️" },
  { date: "15 June 2026", text: "More memories with you 🌸" },
  { date: "20 July", text: "Happy Birthday Mahi ❤️" },
];

export function Timeline() {
  return (
    <section className="py-20 w-full relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-14 px-4"
      >
        <h2 className="font-serif text-3xl md:text-5xl text-white mb-3">Our Journey</h2>
        <div className="w-16 h-0.5 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
      </motion.div>

      <div className="max-w-xl mx-auto px-5 relative">
        {/* Vertical line — always left-side on mobile */}
        <div className="absolute left-[28px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary/10 rounded-full" />

        {timeline.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: i * 0.08 }}
            className="relative flex items-start mb-10 last:mb-0"
          >
            {/* Node */}
            <div className="absolute left-[20px] top-4 w-4 h-4 rounded-full bg-background border-[3px] border-primary shadow-[0_0_12px_#FF1493] z-10 flex-shrink-0" />

            {/* Card */}
            <div className="ml-14 glass-panel p-5 rounded-2xl w-full border border-white/10 border-l-2 border-l-primary">
              <span className="text-secondary font-bold tracking-wider text-xs block mb-1.5">{item.date}</span>
              <p className="text-white text-base font-serif leading-snug">{item.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
