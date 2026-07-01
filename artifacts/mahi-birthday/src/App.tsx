import { useState, useEffect } from 'react';
import { LoadingScreen } from './components/LoadingScreen';
import { HeroSection } from './components/HeroSection';
import { MusicPlayer } from './components/MusicPlayer';
import { PhotoGallery } from './components/PhotoGallery';
import { Timeline } from './components/Timeline';
import { LoveMessage } from './components/LoveMessage';
import { SurpriseSection } from './components/SurpriseSection';
import { DaysCounter } from './components/DaysCounter';
import { LoveReasons } from './components/LoveReasons';
import { BirthdayCake } from './components/BirthdayCake';
import { SlideShow } from './components/SlideShow';
import { VideoMemory } from './components/VideoMemory';
import { FinalScene } from './components/FinalScene';
import { ParticleSystem } from './components/ParticleSystem';
import { CursorTrail } from './components/CursorTrail';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <main className="w-full min-h-[100dvh] bg-background text-foreground relative selection:bg-primary/30">
          <ParticleSystem />
          <CursorTrail />
          <MusicPlayer />

          <HeroSection />
          <PhotoGallery />
          <Timeline />
          <VideoMemory />
          <DaysCounter />
          <LoveReasons />
          <BirthdayCake />
          <LoveMessage />
          <SurpriseSection />
          <SlideShow />
          <FinalScene />
        </main>
      )}
    </>
  );
}

export default App;
