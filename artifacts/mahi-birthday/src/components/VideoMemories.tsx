import { motion } from 'framer-motion';

const videos = [
  { src: '/photos/VID_20260619_100100_981.mp4', title: "Our beautiful moments 🎬" },
  { src: '/photos/VID_20260604_183606796.mp4', title: "A memory I'll always cherish 💫" }
];

export function VideoMemories() {
  return (
    <section className="py-32 px-4 w-full bg-black/40">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">Moving Memories</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {videos.map((vid, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className="glass-panel p-6 rounded-3xl box-glow"
            >
              <div className="aspect-[9/16] rounded-2xl overflow-hidden relative border border-white/10">
                <video 
                  src={vid.src} 
                  className="w-full h-full object-cover"
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                />
              </div>
              <h3 className="text-white font-serif text-xl mt-6 text-center">{vid.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
