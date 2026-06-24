import { useEffect, useRef } from 'react';

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', resize);

    type Heart = { x: number; y: number; size: number; alpha: number; life: number; vy: number };
    const hearts: Heart[] = [];

    const drawHeart = (x: number, y: number, size: number, alpha: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(size, size);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = '#A8224B';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(0, -3, -5, -3, -5, 0);
      ctx.bezierCurveTo(-5, 3, 0, 5, 0, 7);
      ctx.bezierCurveTo(0, 5, 5, 3, 5, 0);
      ctx.bezierCurveTo(5, -3, 0, -3, 0, 0);
      ctx.fill();
      ctx.restore();
    };

    const spawn = (x: number, y: number, burst = false) => {
      const n = burst ? 14 : 1;
      for (let i = 0; i < n; i++) {
        hearts.push({
          x: x + (burst ? (Math.random() - 0.5) * 55 : 0),
          y: y + (burst ? (Math.random() - 0.5) * 55 : 0),
          size: Math.random() * (burst ? 2.2 : 1.4) + 0.4,
          alpha: 1,
          life: 100,
          vy: burst ? -(Math.random() * 1.8 + 0.8) : -0.9,
        });
      }
    };

    let lx = -999, ly = -999;
    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - lx, dy = e.clientY - ly;
      if (dx * dx + dy * dy > 400) { spawn(e.clientX, e.clientY); lx = e.clientX; ly = e.clientY; }
    };
    const onClick = (e: MouseEvent) => spawn(e.clientX, e.clientY, true);
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      const dx = t.clientX - lx, dy = t.clientY - ly;
      if (dx * dx + dy * dy > 900) { spawn(t.clientX, t.clientY); lx = t.clientX; ly = t.clientY; }
    };
    const onTouchStart = (e: TouchEvent) => { const t = e.touches[0]; spawn(t.clientX, t.clientY, true); };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('click', onClick);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });

    let raf: number;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = hearts.length - 1; i >= 0; i--) {
        const h = hearts[i];
        h.life -= 1.4;
        h.alpha = h.life / 100;
        h.y += h.vy;
        h.x += (Math.random() - 0.5) * 0.7;
        if (h.life <= 0) hearts.splice(i, 1);
        else drawHeart(h.x, h.y, h.size, h.alpha);
      }
      raf = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('click', onClick);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchstart', onTouchStart);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-50" />;
}
