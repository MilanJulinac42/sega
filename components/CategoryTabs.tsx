"use client";

import { Category, categoryMeta } from "@/lib/data";

export default function CategoryTabs({
  active,
  onChange,
}: {
  active: Category | "sve";
  onChange: (c: Category | "sve") => void;
}) {
  const tabs: (Category | "sve")[] = [
    "sve",
    "restoran",
    "svirka",
    "setnja",
    "kafa",
    "aktivnost",
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((t) => {
        const isActive = t === active;
        const label = t === "sve" ? "Sve" : categoryMeta[t].label;
        const emoji = t === "sve" ? "💗" : categoryMeta[t].emoji;
        return (
          <button
            key={t}
            onClick={() => onChange(t)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              isActive
                ? "bg-rose-500 text-white shadow-soft"
                : "glass text-rose-700 hover:bg-white"
            }`}
          >
            {emoji} {label}
          </button>
        );
      })}
    </div>
  );
}
