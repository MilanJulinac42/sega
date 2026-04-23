"use client";

const items = [
  { emoji: "🦋", top: "8%", left: "6%", delay: "0s", size: "text-3xl" },
  { emoji: "🌸", top: "22%", left: "92%", delay: "1.2s", size: "text-2xl" },
  { emoji: "🐱", top: "55%", left: "3%", delay: "0.6s", size: "text-3xl" },
  { emoji: "🦋", top: "70%", left: "95%", delay: "2s", size: "text-2xl" },
  { emoji: "🌷", top: "40%", left: "50%", delay: "1.6s", size: "text-xl" },
  { emoji: "🌼", top: "85%", left: "20%", delay: "0.3s", size: "text-2xl" },
  { emoji: "🐾", top: "15%", left: "45%", delay: "2.4s", size: "text-lg" },
  { emoji: "🌹", top: "90%", left: "75%", delay: "1s", size: "text-2xl" },
];

export default function FloatingDecor() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {items.map((it, i) => (
        <span
          key={i}
          className={`absolute ${it.size} opacity-60 floaty`}
          style={{
            top: it.top,
            left: it.left,
            animationDelay: it.delay,
          }}
        >
          {it.emoji}
        </span>
      ))}
    </div>
  );
}
