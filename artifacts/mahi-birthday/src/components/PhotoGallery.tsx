import { motion } from 'framer-motion';
import { useState } from 'react';
import { X } from 'lucide-react';

const photos = [
  { src: '/photos/IMG-20260522-WA0092.jpg', caption: 'Our story', date: '7 May 2026' },
  { src: '/photos/IMG-20260615-WA0004.jpg', caption: 'You', date: '15 June 2026' },
  { src: '/photos/IMG_20260604_193107892.jpg', caption: 'Forever mine', date: '4 June 2026' },
];

export function PhotoGallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <section className="py-20 px-4 w-full">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <p className="text-secondary text-xs tracking-[0.3em] uppercase mb-3 font-sans">Memories</p>
        <h2 className="font-serif text-4xl md:text-5xl text-foreground italic">Captured Moments</h2>
        <div className="gold-line w-28 mx-auto mt-5" />
      </motion.div>

      <div className="flex flex-col gap-5 max-w-sm mx-auto md:max-w-5xl md:grid md:grid-cols-3 md:gap-8">
        {photos.map((photo, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.65, delay: i * 0.12 }}
            onClick={() => setLightbox(i)}
            className="group cursor-pointer"
          >
            <motion.div
              whileTap={{ scale: 0.98 }}
              className="glass-panel rounded-2xl overflow-hidden border touch-manipulation"
              style={{ borderColor: 'hsl(342 66% 39% / 0.2)' }}
            >
              <div className="overflow-hidden relative" style={{ aspectRatio: '3/4' }}>
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex flex-col justify-end p-4"
                  style={{ background: 'linear-gradient(to top, rgba(8,6,20,0.85) 0%, transparent 60%)' }}>
                  <p className="font-serif text-lg italic" style={{ color: 'hsl(36 28% 90%)' }}>{photo.caption}</p>
                  <p className="text-xs font-sans tracking-widest mt-0.5" style={{ color: 'hsl(43 72% 55%)' }}>{photo.date}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {lightbox !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(8,6,20,0.97)' }}
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-5 right-5 w-11 h-11 flex items-center justify-center rounded-full touch-manipulation"
            style={{ background: 'hsl(342 66% 39% / 0.2)', border: '1px solid hsl(342 66% 39% / 0.4)', color: 'hsl(36 28% 90%)' }}
            onClick={() => setLightbox(null)}
          >
            <X size={18} />
          </button>
          <motion.img
            initial={{ scale: 0.88, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            src={photos[lightbox].src}
            alt={photos[lightbox].caption}
            className="max-w-full rounded-2xl object-contain"
            style={{ maxHeight: '85dvh', boxShadow: '0 0 60px hsl(342 66% 39% / 0.2)' }}
            onClick={(e) => e.stopPropagation()}
          />
          <div className="absolute bottom-8 text-center">
            <p className="font-serif italic" style={{ color: 'hsl(36 28% 85%)' }}>{photos[lightbox].caption}</p>
            <p className="text-xs tracking-widest mt-1 font-sans" style={{ color: 'hsl(43 72% 50%)' }}>{photos[lightbox].date}</p>
          </div>
        </motion.div>
      )}
    </section>
  );
}
