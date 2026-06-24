import { motion } from 'framer-motion';

const story = [
  {
    icon: '🍛',
    label: 'The Beginning',
    heading: 'First Met at Biryani Centre',
    text: 'Two strangers, one table, the aroma of biryani — and the universe quietly doing its thing.',
  },
  {
    icon: '🌯',
    label: 'Chapter Two',
    heading: 'Shawarma Date',
    text: 'Because every great love story has a second chapter, and ours tasted like shawarma.',
  },
  {
    icon: '🛍️',
    label: 'Chapter Three',
    heading: 'Mall Together',
    text: 'Walking through every floor, every shop — it was never about the mall, it was always about you.',
  },
  {
    icon: '🌅',
    label: 'The Day',
    heading: 'Day Out — She Said Yes',
    text: 'I told you how I felt. My heart stopped for a second. Then you smiled and said yes — and everything changed.',
  },
  {
    icon: '🚗',
    label: 'Chapter Five',
    heading: 'Picked Her Up · Mahavir Nagar',
    text: 'The drive, the music, the open sky — some moments don\'t need words, they just need each other.',
  },
  {
    icon: '🌙',
    label: 'Chapter Six',
    heading: 'Showed Up When It Mattered',
    text: 'You were sad the night before. I couldn\'t let that be. Some things are worth dropping everything for.',
  },
  {
    icon: '🦷',
    label: 'Chapter Seven',
    heading: 'Dentist Day Together',
    text: 'Even the most ordinary errands become something when you\'re beside me. That\'s just you.',
  },
];

export function Timeline() {
  return (
    <section className="py-24 w-full relative">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16 px-4"
      >
        <p className="text-secondary text-xs tracking-[0.3em] uppercase mb-3 font-sans">Our Journey</p>
        <h2 className="font-serif text-4xl md:text-5xl text-foreground italic">
          How We Got Here
        </h2>
        <div className="gold-line w-32 mx-auto mt-5" />
      </motion.div>

      <div className="max-w-lg mx-auto px-5 relative">
        {/* Vertical line */}
        <div className="absolute left-[36px] top-0 bottom-0 w-px"
          style={{ background: 'linear-gradient(to bottom, transparent, hsl(342 66% 39% / 0.5), hsl(43 72% 44% / 0.4), transparent)' }} />

        {story.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: i * 0.07 }}
            className="relative flex items-start mb-10 last:mb-0"
          >
            {/* Icon node */}
            <div className="absolute left-[24px] top-4 w-6 h-6 rounded-full flex items-center justify-center z-10 flex-shrink-0"
              style={{ background: 'hsl(244 28% 8%)', border: '1px solid hsl(342 66% 39% / 0.5)', boxShadow: '0 0 10px hsl(342 66% 39% / 0.2)' }}>
              <span className="text-[10px]">{item.icon}</span>
            </div>

            {/* Card */}
            <div className="ml-16 glass-panel p-5 rounded-xl w-full border-l-2"
              style={{ borderLeftColor: 'hsl(342 66% 39% / 0.6)' }}>
              <p className="text-secondary text-[10px] tracking-[0.25em] uppercase mb-1 font-sans">{item.label}</p>
              <h3 className="font-serif text-lg text-foreground italic mb-2">{item.heading}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed font-sans font-light">{item.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
