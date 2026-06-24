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

    const hearts: { x: number; y: number; size: number; alpha: number; life: number; vy: number }[] = [];

    const drawHeart = (x: number, y: number, size: number, alpha: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(size, size);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = '#FF1493';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(0, -3, -5, -3, -5, 0);
      ctx.bezierCurveTo(-5, 3, 0, 5, 0, 7);
      ctx.bezierCurveTo(0, 5, 5, 3, 5, 0);
      ctx.bezierCurveTo(5, -3, 0, -3, 0, 0);
      ctx.fill();
      ctx.restore();
    };

    const spawnHeart = (x: number, y: number, burst = false) => {
      const count = burst ? 18 : 1;
      for (let i = 0; i < count; i++) {
        hearts.push({
          x: x + (burst ? (Math.random() - 0.5) * 60 : 0),
          y: y + (burst ? (Math.random() - 0.5) * 60 : 0),
          size: Math.random() * (burst ? 2.5 : 1.5) + 0.5,
          alpha: 1,
          life: 100,
          vy: burst ? -(Math.random() * 2 + 1) : -1,
        });
      }
    };

    // Mouse handlers
    let lastX = -999, lastY = -999;
    const onMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - lastX, dy = e.clientY - lastY;
      if (dx * dx + dy * dy > 400) {
        spawnHeart(e.clientX, e.clientY);
        lastX = e.clientX;
        lastY = e.clientY;
      }
    };
    const onClick = (e: MouseEvent) => spawnHeart(e.clientX, e.clientY, true);

    // Touch handlers for mobile
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      const dx = t.clientX - lastX, dy = t.clientY - lastY;
      if (dx * dx + dy * dy > 900) {
        spawnHeart(t.clientX, t.clientY);
        lastX = t.clientX;
        lastY = t.clientY;
      }
    };
    const onTouchStart = (e: TouchEvent) => {
      const t = e.touches[0];
      spawnHeart(t.clientX, t.clientY, true);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('click', onClick);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });

    let raf: number;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = hearts.length - 1; i >= 0; i--) {
        const h = hearts[i];
        h.life -= 1.5;
        h.alpha = h.life / 100;
        h.y += h.vy;
        h.x += (Math.random() - 0.5) * 0.8;
        if (h.life <= 0) {
          hearts.splice(i, 1);
        } else {
          drawHeart(h.x, h.y, h.size, h.alpha);
        }
      }
      raf = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click', onClick);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchstart', onTouchStart);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
    />
  );
}
