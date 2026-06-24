import { motion } from 'framer-motion';

const videos = [
  { src: '/photos/VID_20260619_100100_981.mp4', title: "Our beautiful moments 🎬" },
  { src: '/photos/VID_20260604_183606796.mp4', title: "A memory I'll always cherish 💫" },
];

export function VideoMemories() {
  return (
    <section className="py-20 px-4 w-full bg-black/40">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2 className="font-serif text-3xl md:text-5xl text-white mb-3">Moving Memories</h2>
        <div className="w-16 h-0.5 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
      </motion.div>

      <div className="flex flex-col gap-8 max-w-sm mx-auto md:max-w-5xl md:grid md:grid-cols-2">
        {videos.map((vid, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.15 }}
            className="glass-panel p-4 rounded-3xl box-glow border border-white/10"
          >
            <div className="rounded-2xl overflow-hidden relative border border-white/10" style={{ aspectRatio: '9/16' }}>
              <video
                src={vid.src}
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
            <h3 className="text-white font-serif text-lg mt-4 text-center">{vid.title}</h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
