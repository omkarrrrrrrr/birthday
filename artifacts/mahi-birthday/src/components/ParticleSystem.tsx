import { useEffect, useRef } from 'react';

export function ParticleSystem() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    // Subtle gold fireflies — CSS-animated only
    for (let i = 0; i < 7; i++) {
      const el = document.createElement('div');
      const size = 1.5 + Math.random() * 2.5;
      el.style.cssText = `
        position:absolute;
        width:${size}px;height:${size}px;
        border-radius:50%;
        background:hsl(${43 + Math.random() * 10},72%,60%);
        left:${Math.random() * 100}%;top:${Math.random() * 100}%;
        animation:
          fireflyFloat ${4 + Math.random() * 5}s ease-in-out ${Math.random() * 5}s infinite alternate,
          fireflyFade  ${2.5 + Math.random() * 3}s ease-in-out ${Math.random() * 3}s infinite alternate;
        will-change:transform,opacity;
        pointer-events:none;
      `;
      container.appendChild(el);
    }

    // Subtle rose petals
    for (let i = 0; i < 4; i++) {
      const el = document.createElement('div');
      const w = 8 + Math.random() * 10, h = 5 + Math.random() * 6;
      el.style.cssText = `
        position:absolute;
        width:${w}px;height:${h}px;
        border-radius:50% 0 50% 0;
        background:hsl(${338 + Math.random() * 10},60%,${55 + Math.random() * 10}%);
        opacity:0.3;
        left:${Math.random() * 100}%;top:-3%;
        animation:petalFall ${11 + Math.random() * 8}s linear ${Math.random() * 8}s infinite;
        will-change:transform;
        pointer-events:none;
      `;
      container.appendChild(el);
    }

    return () => { if (container) container.innerHTML = ''; };
  }, []);

  return <div ref={ref} className="fixed inset-0 pointer-events-none z-0 overflow-hidden" />;
}
