import { useEffect, useRef } from 'react';

/* Tiny, CSS-keyframe-driven particles for ambient atmosphere.
   Kept very lean (8 fireflies + 5 petals) so it never stresses the CPU.
   Each element is GPU-composited via transform/opacity only. */

export function ParticleSystem() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    // Fireflies — pure CSS animation, no JS loop needed
    for (let i = 0; i < 8; i++) {
      const el = document.createElement('div');
      el.className = 'firefly';
      el.style.cssText = `
        position: absolute;
        width: ${2 + Math.random() * 3}px;
        height: ${2 + Math.random() * 3}px;
        border-radius: 50%;
        background: hsl(${45 + Math.random() * 30},100%,75%);
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: fireflyFloat ${4 + Math.random() * 4}s ease-in-out ${Math.random() * 4}s infinite alternate,
                   fireflyFade  ${2 + Math.random() * 3}s ease-in-out ${Math.random() * 3}s infinite alternate;
        will-change: transform, opacity;
        pointer-events: none;
      `;
      container.appendChild(el);
    }

    // Rose petals — drift down off-screen, loop
    for (let i = 0; i < 5; i++) {
      const el = document.createElement('div');
      el.style.cssText = `
        position: absolute;
        width: ${10 + Math.random() * 14}px;
        height: ${6 + Math.random() * 8}px;
        border-radius: 50% 0 50% 0;
        background: hsl(${330 + Math.random() * 30},100%,${68 + Math.random() * 12}%);
        opacity: 0.45;
        left: ${Math.random() * 100}%;
        top: -5%;
        animation: petalFall ${10 + Math.random() * 8}s linear ${Math.random() * 8}s infinite;
        will-change: transform;
        pointer-events: none;
      `;
      container.appendChild(el);
    }

    return () => { if (container) container.innerHTML = ''; };
  }, []);

  return <div ref={ref} className="fixed inset-0 pointer-events-none z-0 overflow-hidden" />;
}
