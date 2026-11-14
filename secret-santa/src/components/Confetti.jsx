import { useEffect, useRef } from 'react';

const COLORS = ['#D6B879', '#E8D3A2', '#F7F0E3', '#B8944F', '#8E2638'];

/**
 * Esplosione di coriandoli dorati e stelline. Si attiva quando `fire` diventa true.
 */
export default function Confetti({ fire }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!fire) return undefined;
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth, h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const count = reduce ? 40 : 150;
    const ox = w / 2, oy = h * 0.42;
    const parts = Array.from({ length: count }, () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 520 + 180;
      return {
        x: ox, y: oy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 260,
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 12,
        size: Math.random() * 6 + 4,
        star: Math.random() < 0.3,
        color: COLORS[(Math.random() * COLORS.length) | 0],
        life: 0,
        ttl: Math.random() * 1.4 + 2.2,
      };
    });

    function star(r) {
      ctx.beginPath();
      for (let i = 0; i < 10; i++) {
        const rad = i % 2 ? r * 0.45 : r;
        const a = (Math.PI / 5) * i - Math.PI / 2;
        ctx.lineTo(Math.cos(a) * rad, Math.sin(a) * rad);
      }
      ctx.closePath();
      ctx.fill();
    }

    let raf = 0, last = performance.now();
    function frame(now) {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      ctx.clearRect(0, 0, w, h);
      let alive = 0;
      for (const p of parts) {
        p.life += dt;
        if (p.life > p.ttl) continue;
        alive++;
        p.vx *= 0.985;
        p.vy = p.vy * 0.985 + 520 * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.rot += p.vr * dt;
        ctx.save();
        ctx.globalAlpha = Math.max(0, 1 - p.life / p.ttl);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        if (p.star) star(p.size * 0.9);
        else ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2 * (0.6 + Math.abs(Math.sin(p.rot * 2))));
        ctx.restore();
      }
      if (alive) raf = requestAnimationFrame(frame);
      else ctx.clearRect(0, 0, w, h);
    }
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [fire]);

  return <canvas ref={ref} className="confetti" aria-hidden="true" />;
}
