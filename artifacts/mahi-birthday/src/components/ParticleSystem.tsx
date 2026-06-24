import { useEffect, useRef } from 'react';

export function ParticleSystem() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Fireflies
    for (let i = 0; i < 30; i++) {
      const firefly = document.createElement('div');
      firefly.className = 'absolute rounded-full bg-accent/80 blur-[1px] animate-pulse';
      
      const size = Math.random() * 4 + 1;
      firefly.style.width = `${size}px`;
      firefly.style.height = `${size}px`;
      
      firefly.style.left = `${Math.random() * 100}%`;
      firefly.style.top = `${Math.random() * 100}%`;
      
      firefly.style.animationDuration = `${Math.random() * 3 + 2}s`;
      firefly.style.animationDelay = `${Math.random() * 2}s`;
      
      container.appendChild(firefly);
    }

    // Rose petals
    for (let i = 0; i < 15; i++) {
      const petal = document.createElement('div');
      petal.className = 'absolute bg-primary/40 rounded-full blur-[2px]';
      
      const width = Math.random() * 15 + 10;
      const height = Math.random() * 10 + 5;
      petal.style.width = `${width}px`;
      petal.style.height = `${height}px`;
      
      petal.style.left = `${Math.random() * 100}%`;
      petal.style.top = `-${Math.random() * 20}%`;
      
      petal.style.transition = 'top 10s linear, left 10s ease-in-out';
      
      const animatePetal = () => {
        petal.style.top = '120%';
        petal.style.left = `${Math.random() * 100}%`;
        petal.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        setTimeout(() => {
          petal.style.transition = 'none';
          petal.style.top = `-${Math.random() * 20}%`;
          
          setTimeout(() => {
            petal.style.transition = 'top 10s linear, left 10s ease-in-out';
            animatePetal();
          }, 100);
        }, 10000);
      };
      
      setTimeout(animatePetal, Math.random() * 5000);
      container.appendChild(petal);
    }

    return () => {
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    />
  );
}
