import { useMemo } from "react";
import "./Confetti.css";

const COLORS = ["#ff6a88", "#ffd166", "#06d6a0", "#4cc9f0", "#b388ff", "#ffffff"];

// Party-popper burst from both bottom corners. Change `burst` (number) to fire again.
export default function Confetti({ burst }) {
  const pieces = useMemo(() => {
    if (!burst) return [];
    return Array.from({ length: 110 }, (_, i) => {
      const left = i % 2 === 0;
      return {
        id: i,
        origin: left ? "0%" : "100%",
        dx: (left ? 1 : -1) * (80 + Math.random() * 520),
        dy: 280 + Math.random() * 420,
        rot: Math.random() * 1080 - 540,
        size: 6 + Math.random() * 8,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        dur: 2.8 + Math.random() * 2.2,
        delay: Math.random() * 0.25,
        round: Math.random() > 0.6,
      };
    });
  }, [burst]);

  return (
    <div className="confetti" aria-hidden="true">
      {pieces.map((p) => (
        <i key={p.id} style={{
          left: p.origin, background: p.color, width: p.size, height: p.size * (p.round ? 1 : 0.5),
          borderRadius: p.round ? "50%" : "2px", animationDuration: `${p.dur}s`, animationDelay: `${p.delay}s`,
          "--dx": `${p.dx}px`, "--dy": `${p.dy}px`, "--rot": `${p.rot}deg`,
        }} />
      ))}
    </div>
  );
}
