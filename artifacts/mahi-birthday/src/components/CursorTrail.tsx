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
    
    const hearts: {x: number, y: number, size: number, alpha: number, life: number}[] = [];
    
    const drawHeart = (x: number, y: number, size: number, alpha: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(size, size);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = '#FF1493'; // hot pink
      
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(0, -3, -5, -3, -5, 0);
      ctx.bezierCurveTo(-5, 3, 0, 5, 0, 7);
      ctx.bezierCurveTo(0, 5, 5, 3, 5, 0);
      ctx.bezierCurveTo(5, -3, 0, -3, 0, 0);
      ctx.fill();
      
      ctx.restore();
    };
    
    let mouseX = width / 2;
    let mouseY = height / 2;
    
    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      if (Math.random() > 0.5) {
        hearts.push({
          x: mouseX,
          y: mouseY,
          size: Math.random() * 1.5 + 0.5,
          alpha: 1,
          life: 100
        });
      }
    };
    
    const onClick = (e: MouseEvent) => {
      // Sparkle explosion
      for (let i = 0; i < 20; i++) {
        hearts.push({
          x: e.clientX + (Math.random() - 0.5) * 50,
          y: e.clientY + (Math.random() - 0.5) * 50,
          size: Math.random() * 2 + 1,
          alpha: 1,
          life: 100
        });
      }
    };
    
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('click', onClick);
    
    let animationFrame: number;
    
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      for (let i = hearts.length - 1; i >= 0; i--) {
        const heart = hearts[i];
        
        heart.life--;
        heart.alpha = heart.life / 100;
        heart.y -= 1; // Float up slightly
        heart.x += (Math.random() - 0.5) * 1;
        
        if (heart.life <= 0) {
          hearts.splice(i, 1);
        } else {
          drawHeart(heart.x, heart.y, heart.size, heart.alpha);
        }
      }
      
      animationFrame = requestAnimationFrame(render);
    };
    
    render();
    
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click', onClick);
      cancelAnimationFrame(animationFrame);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-50"
    />
  );
}
