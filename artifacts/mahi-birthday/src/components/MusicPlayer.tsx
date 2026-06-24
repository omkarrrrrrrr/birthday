import { useAudio } from '@/hooks/useAudio';
import { Play, Pause, Music } from 'lucide-react';
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
      <div className="glass-panel px-5 py-3 rounded-full flex items-center gap-3 box-glow border border-white/20 shadow-[0_8px_32px_rgba(255,20,147,0.2)]">
        <button
          onClick={toggle}
          data-testid="button-music-toggle"
          className="w-11 h-11 rounded-full bg-primary/20 hover:bg-primary/40 active:bg-primary/60 flex items-center justify-center text-white transition-colors touch-manipulation flex-shrink-0"
          aria-label={playing ? 'Pause music' : 'Play music'}
        >
          {playing ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
        </button>

        <div className="flex flex-col min-w-0">
          <span className="text-sm font-medium text-white flex items-center gap-1.5 whitespace-nowrap">
            I Love You ❤️
            {playing && <Music size={11} className="animate-bounce text-primary flex-shrink-0" />}
          </span>
          <span className="text-[11px] text-white/50">Bodyguard</span>
        </div>

        {/* Waveform */}
        <div className="flex items-center gap-[3px] ml-1 h-6 flex-shrink-0">
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              className="w-[3px] bg-secondary rounded-full"
              animate={playing ? { height: ['20%', '100%', '20%'] } : { height: '20%' }}
              transition={{
                repeat: Infinity,
                duration: 0.6 + i * 0.12,
                delay: i * 0.1,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
