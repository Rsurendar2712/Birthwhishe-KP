import { useMemo } from "react";
import "./EmojiRain.css";

// 3D-style emoji rain: depth (translateZ), rotation, blur and varied sizes.
export default function EmojiRain({ emoji, burst }) {
  const items = useMemo(() => {
    if (!burst) return [];
    return Array.from({ length: 55 }, (_, i) => {
      const z = Math.random() * 500 - 250; // depth
      return {
        id: `${burst}-${i}`,
        left: Math.random() * 100,
        size: 28 + Math.random() * 56,
        z,
        blur: z < -80 ? Math.min(4, Math.abs(z + 80) / 45) : 0,
        dur: 3.2 + Math.random() * 3.2,
        delay: Math.random() * 1.6,
        drift: Math.random() * 120 - 60,
        spinX: Math.random() * 720 - 360,
        spinY: Math.random() * 720 - 360,
      };
    });
  }, [burst]);

  return (
    <div className="emoji-rain" aria-hidden="true">
      {items.map((e) => (
        <span key={e.id} style={{
          left: `${e.left}%`, fontSize: e.size, filter: `blur(${e.blur}px) drop-shadow(0 12px 8px rgba(0,0,0,.45))`,
          animationDuration: `${e.dur}s`, animationDelay: `${e.delay}s`,
          "--z": `${e.z}px`, "--drift": `${e.drift}px`, "--sx": `${e.spinX}deg`, "--sy": `${e.spinY}deg`,
        }}>{emoji}</span>
      ))}
    </div>
  );
}
