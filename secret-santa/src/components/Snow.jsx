import { useEffect, useRef } from 'react';

/**
 * Neve che cade lentamente su un canvas a schermo intero.
 * Leggera: numero di fiocchi in base allo schermo, DPR limitato a 2,
 * pausa quando la scheda non è visibile, rispetto di prefers-reduced-motion.
 */
export default function Snow() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w = 0, h = 0, flakes = [], raf = 0, last = performance.now();

    const makeFlake = (randomY) => ({
      x: Math.random() * w,
      y: randomY ? Math.random() * h : -10,
      r: Math.random() * 2.2 + 0.6,
      speed: Math.random() * 18 + 12,          // px al secondo
      drift: Math.random() * 0.8 + 0.2,
      phase: Math.random() * Math.PI * 2,
      alpha: Math.random() * 0.5 + 0.35,
    });

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = reduce ? 25 : Math.round(Math.min(110, (w * h) / 9000));
      flakes = Array.from({ length: count }, () => makeFlake(true));
    }

    function frame(now) {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      ctx.clearRect(0, 0, w, h);
      for (const f of flakes) {
        f.phase += dt * f.drift;
        f.y += f.speed * dt * (reduce ? 0.3 : 1);
        f.x += Math.sin(f.phase) * 0.3;
        if (f.y > h + 10) Object.assign(f, makeFlake(false));
        ctx.globalAlpha = f.alpha;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fillStyle = '#fffaf0';
        ctx.fill();
      }
      raf = requestAnimationFrame(frame);
    }

    function onVisibility() {
      cancelAnimationFrame(raf);
      if (!document.hidden) { last = performance.now(); raf = requestAnimationFrame(frame); }
    }

    resize();
    raf = requestAnimationFrame(frame);
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return <canvas ref={ref} className="snow" aria-hidden="true" />;
}
