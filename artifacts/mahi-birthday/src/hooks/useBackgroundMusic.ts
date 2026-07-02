import { useState, useCallback } from 'react';

type BackgroundMusicContextType = {
  pauseMusic: () => void;
  resumeMusic: () => void;
};

export const BackgroundMusicContext = {
  pauseMusic: () => {},
  resumeMusic: () => {},
};

export function useBackgroundMusic() {
  const [pauseMusic, setPauseMusic] = useState<() => void>(() => {});
  const [resumeMusic, setResumeMusic] = useState<() => void>(() => {});

  const registerControls = useCallback((pause: () => void, resume: () => void) => {
    setPauseMusic(() => pause);
    setResumeMusic(() => resume);
  }, []);

  return {
    pauseMusic: () => pauseMusic(),
    resumeMusic: () => resumeMusic(),
    registerControls,
  };
}