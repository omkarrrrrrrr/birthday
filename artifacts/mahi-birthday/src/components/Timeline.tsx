import { motion } from 'framer-motion';

const timeline = [
  { date: "Day 1", text: "The day I first saw you — my world changed forever" },
  { date: "Everyday", text: "Every coffee with you is my favorite hour" },
  { date: "Always", text: "You make ordinary days feel magical" },
  { date: "22 May 2026", text: "A moment to remember always 💕" },
  { date: "4 June 2026", text: "That day I'll never forget ❤️" },
  { date: "15 June 2026", text: "More memories with you 🌸" },
  { date: "20 July", text: "Happy Birthday Mahi ❤️" }
];

export function Timeline() {
  return (
    <section className="py-32 w-full relative">
      <div className="max-w-4xl mx-auto px-4 relative">
        <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-secondary to-primary/10 rounded-full md:-translate-x-1/2" />
        
        {timeline.map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className={`relative flex items-center justify-between mb-16 md:mb-24 ${
              i % 2 === 0 ? 'md:flex-row-reverse' : ''
            }`}
          >
            {/* Center Node */}
            <div className="absolute left-[20px] md:left-1/2 w-8 h-8 rounded-full bg-background border-4 border-primary shadow-[0_0_15px_#FF1493] md:-translate-x-1/2 -translate-x-[14px] z-10 animate-pulse" />
            
            {/* Content */}
            <div className="w-full pl-16 md:pl-0 md:w-[45%]">
              <div className="glass-panel p-6 rounded-2xl hover:scale-105 transition-transform duration-300 box-glow border-l-4 border-l-primary md:border-l-0">
                <span className="text-secondary font-bold tracking-wider text-sm block mb-2">{item.date}</span>
                <p className="text-white text-lg font-serif">{item.text}</p>
              </div>
            </div>
            
            {/* Empty space for alternating layout */}
            <div className="hidden md:block w-[45%]" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
