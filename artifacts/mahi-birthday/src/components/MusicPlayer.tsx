import { useAudio } from '@/hooks/useAudio';
import { Play, Pause } from 'lucide-react';
import { motion } from 'framer-motion';

export function MusicPlayer() {
  const { playing, toggle } = useAudio('/music.mp3');

  return (
    <motion.div
      className="fixed z-40"
      style={{ bottom: 'max(1.25rem, env(safe-area-inset-bottom, 1.25rem))', right: '1.25rem' }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, duration: 0.5, type: 'spring' }}
    >
      <button
        onClick={toggle}
        data-testid="button-music-toggle"
        className="w-11 h-11 rounded-full flex items-center justify-center touch-manipulation transition-colors"
        style={{
          background: 'rgba(8,6,20,0.75)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid hsl(342 66% 39% / 0.4)',
          boxShadow: '0 2px 20px hsl(342 66% 39% / 0.2)',
          color: 'hsl(36 28% 88%)',
        }}
      >
        {playing ? <Pause size={15} /> : <Play size={15} className="ml-0.5" />}
      </button>
    </motion.div>
  );
}
