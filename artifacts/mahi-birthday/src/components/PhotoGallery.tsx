import { motion } from 'framer-motion';
import { useState } from 'react';
import { X } from 'lucide-react';

const photos = [
  { src: '/photos/IMG-20260522-WA0092.jpg', caption: 'Our story 💕' },
  { src: '/photos/IMG-20260615-WA0004.jpg', caption: 'You ❤️' },
  { src: '/photos/IMG_20260604_193107892.jpg', caption: 'Forever mine 🌙' },
];

export function PhotoGallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <section className="py-20 px-4 w-full">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2 className="font-serif text-3xl md:text-5xl text-white mb-3">Captured Moments</h2>
        <div className="w-16 h-0.5 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
      </motion.div>

      {/* Mobile: vertical stack | Desktop: 3-col grid */}
      <div className="flex flex-col gap-6 max-w-sm mx-auto md:max-w-5xl md:grid md:grid-cols-3 md:gap-8">
        {photos.map((photo, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="relative group"
            onClick={() => setLightbox(i)}
          >
            <motion.div
              whileTap={{ scale: 0.97 }}
              className="glass-panel p-3 rounded-2xl box-glow cursor-pointer border border-white/10 active:border-pink-500/40 transition-colors"
            >
              <div className="overflow-hidden rounded-xl relative" style={{ aspectRatio: '3/4' }}>
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                  <p className="text-white font-serif text-lg">{photo.caption}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 text-white touch-manipulation"
            onClick={() => setLightbox(null)}
            data-testid="button-lightbox-close"
          >
            <X size={20} />
          </button>
          <motion.img
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            src={photos[lightbox].src}
            alt={photos[lightbox].caption}
            className="max-w-full max-h-[85dvh] rounded-2xl object-contain shadow-[0_0_60px_rgba(255,20,147,0.3)]"
            onClick={(e) => e.stopPropagation()}
          />
          <p className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 font-serif text-lg">
            {photos[lightbox].caption}
          </p>
        </motion.div>
      )}
    </section>
  );
}
