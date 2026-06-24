import { useAudio } from '@/hooks/useAudio';
import { Play, Pause, Music } from 'lucide-react';
import { motion } from 'framer-motion';

export function MusicPlayer() {
  const { playing, toggle } = useAudio('/music.mp3');

  return (
    <motion.div 
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2, duration: 1 }}
    >
      <div className="glass-panel px-6 py-3 rounded-full flex items-center gap-4 box-glow">
        <button 
          onClick={toggle}
          className="w-10 h-10 rounded-full bg-primary/20 hover:bg-primary/40 flex items-center justify-center text-white transition-colors"
        >
          {playing ? <Pause size={18} /> : <Play size={18} className="ml-1" />}
        </button>
        
        <div className="flex flex-col">
          <span className="text-sm font-medium text-white flex items-center gap-2">
            I Love You ❤️
            {playing && <Music size={12} className="animate-bounce text-primary" />}
          </span>
          <span className="text-xs text-white/50">Bodyguard</span>
        </div>
        
        {/* Waveform */}
        <div className="flex items-center gap-1 ml-4 h-6">
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              className="w-1 bg-secondary rounded-full"
              animate={playing ? { height: ["20%", "100%", "20%"] } : { height: "20%" }}
              transition={{
                repeat: Infinity,
                duration: 0.8 + Math.random() * 0.5,
                delay: i * 0.1
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
