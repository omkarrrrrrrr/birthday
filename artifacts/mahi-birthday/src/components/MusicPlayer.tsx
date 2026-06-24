import { useAudio } from '@/hooks/useAudio';
import { Play, Pause } from 'lucide-react';
import { motion } from 'framer-motion';

export function MusicPlayer() {
  const { playing, toggle } = useAudio('/music.mp3');

  return (
    <motion.div
      className="fixed left-1/2 -translate-x-1/2 z-40"
      style={{ bottom: 'max(1.25rem, env(safe-area-inset-bottom, 1.25rem))' }}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2, duration: 1 }}
    >
      <div className="flex items-center gap-3 px-5 py-3 rounded-full"
        style={{
          background: 'rgba(8,6,20,0.7)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid hsl(342 66% 39% / 0.3)',
          boxShadow: '0 4px 30px hsl(342 66% 39% / 0.12)',
        }}>
        <button
          onClick={toggle}
          data-testid="button-music-toggle"
          className="w-10 h-10 rounded-full flex items-center justify-center transition-colors touch-manipulation flex-shrink-0"
          style={{
            background: playing ? 'hsl(342 66% 39% / 0.3)' : 'hsl(342 66% 39% / 0.15)',
            border: '1px solid hsl(342 66% 39% / 0.4)',
            color: 'hsl(36 28% 90%)',
          }}
        >
          {playing ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
        </button>

        <div className="min-w-0">
          <p className="text-sm font-sans whitespace-nowrap" style={{ color: 'hsl(36 28% 88%)' }}>
            I Love You <span className="text-xs" style={{ color: 'hsl(342 66% 55%)' }}>♥</span>
          </p>
          <p className="text-[11px] font-sans" style={{ color: 'hsl(36 28% 50%)' }}>Bodyguard</p>
        </div>

        {/* Waveform */}
        <div className="flex items-center gap-[3px] h-5 flex-shrink-0">
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              className="w-[3px] rounded-full"
              style={{ background: 'hsl(43 72% 44%)' }}
              animate={playing ? { height: ['20%', '100%', '20%'] } : { height: '20%' }}
              transition={{ repeat: Infinity, duration: 0.55 + i * 0.1, delay: i * 0.1 }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
