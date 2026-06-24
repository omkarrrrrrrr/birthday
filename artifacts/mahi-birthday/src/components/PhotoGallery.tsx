import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const photos = [
  { src: '/photos/IMG-20260522-WA0092.jpg', caption: 'Our story 💕' },
  { src: '/photos/IMG-20260615-WA0004.jpg', caption: 'You ❤️' },
  { src: '/photos/IMG_20260604_193107892.jpg', caption: 'Forever mine 🌙' }
];

export function PhotoGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <section ref={containerRef} className="py-32 px-4 md:px-12 w-full max-w-7xl mx-auto min-h-screen flex items-center">
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <h2 className="font-serif text-4xl md:text-6xl text-white mb-4">Captured Moments</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {photos.map((photo, i) => (
            <motion.div
              key={i}
              style={{ y: i === 0 ? y1 : i === 1 ? y2 : y3 }}
              className="relative group perspective-1000"
            >
              <motion.div 
                whileHover={{ scale: 1.05, rotateY: 5, rotateX: 5 }}
                className="glass-panel p-4 rounded-2xl transform-style-3d transition-all duration-500 box-glow"
              >
                <div className="overflow-hidden rounded-xl aspect-[3/4] relative">
                  <img 
                    src={photo.src} 
                    alt={photo.caption} 
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <p className="text-white font-serif text-2xl translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      {photo.caption}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
