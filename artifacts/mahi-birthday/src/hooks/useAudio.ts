import { useState, useEffect, useRef } from 'react';

export function useAudio(url: string) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio(url);
    audio.loop = true;
    audioRef.current = audio;

    const startPlaying = () => {
      audio.play()
        .then(() => setPlaying(true))
        .catch((e) => console.log('Autoplay prevented', e));
    };

    // Attempt autoplay immediately
    startPlaying();

    // Or wait for interaction
    const handleInteraction = () => {
      startPlaying();
      window.removeEventListener('click', handleInteraction);
    };

    window.addEventListener('click', handleInteraction);

    return () => {
      window.removeEventListener('click', handleInteraction);
      audio.pause();
    };
  }, [url]);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying(!playing);
  };

  return { playing, toggle };
}
