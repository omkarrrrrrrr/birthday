import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

export function VideoMemory() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else          { v.pause(); setPlaying(false); }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  return (
    <section className="py-20 px-4 w-full">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-10"
      >
        <p className="text-secondary text-xs tracking-[0.3em] uppercase mb-3 font-sans">A Cute Memory</p>
        <h2 className="font-serif text-4xl md:text-5xl text-foreground italic">
          Captured on Video
        </h2>
        <div className="gold-line w-28 mx-auto mt-5" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="mx-auto"
        style={{ maxWidth: 420 }}
      >
        {/* Video frame */}
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: '#000',
            border: '1px solid hsl(342 66% 39% / 0.25)',
            boxShadow: '0 8px 60px hsl(342 66% 39% / 0.12)',
          }}
        >
          <video
            ref={videoRef}
            src="/memory.mp4"
            playsInline
            preload="metadata"
            onEnded={() => setPlaying(false)}
            className="w-full block"
            style={{
              /* contain so the full video is visible — no cropping */
              objectFit: 'contain',
              maxHeight: '75dvh',
              background: '#000',
            }}
          />

          {/* Tap-to-play overlay — only visible when paused */}
          {!playing && (
            <button
              onClick={togglePlay}
              data-testid="button-video-play"
              className="absolute inset-0 flex items-center justify-center touch-manipulation"
              style={{ background: 'rgba(8,6,20,0.35)' }}
            >
              <motion.div
                whileTap={{ scale: 0.9 }}
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{
                  background: 'hsl(342 66% 39% / 0.85)',
                  boxShadow: '0 0 30px hsl(342 66% 39% / 0.4)',
                  border: '1px solid hsl(36 28% 80% / 0.3)',
                }}
              >
                <Play size={26} fill="currentColor" className="ml-1" style={{ color: 'hsl(36 28% 94%)' }} />
              </motion.div>
            </button>
          )}
        </div>

        {/* Controls bar */}
        <div
          className="flex items-center justify-between px-4 py-3 rounded-xl mt-3"
          style={{
            background: 'rgba(8,6,20,0.55)',
            backdropFilter: 'blur(12px)',
            border: '1px solid hsl(342 66% 39% / 0.18)',
          }}
        >
          <button
            onClick={togglePlay}
            data-testid="button-video-playpause"
            className="flex items-center gap-2 touch-manipulation"
            style={{ color: 'hsl(36 28% 82%)' }}
          >
            {playing
              ? <Pause size={18} />
              : <Play size={18} fill="currentColor" />}
            <span className="text-sm font-sans">{playing ? 'Pause' : 'Play'}</span>
          </button>

          <span className="font-serif italic text-sm" style={{ color: 'hsl(43 72% 52%)' }}>
            4 June 2026 ❤️
          </span>

          <button
            onClick={toggleMute}
            data-testid="button-video-mute"
            className="touch-manipulation"
            style={{ color: 'hsl(36 28% 60%)' }}
          >
            {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
        </div>
      </motion.div>
    </section>
  );
}
