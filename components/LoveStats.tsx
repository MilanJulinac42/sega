const stats = [
  {
    label: "Standing ovacija za Teu",
    value: "∞",
    emoji: "🎭",
    note: "svaki put kad uđe u sobu",
  },
  {
    label: "Leptira u mom stomaku",
    value: "1.472",
    emoji: "🦋",
    note: "i broj raste",
  },
  {
    label: "Maca koje bi te pratile",
    value: "sve",
    emoji: "🐱",
    note: "imaš taj vajb",
  },
  {
    label: "Karfiola i humusa",
    value: "beskonačno",
    emoji: "🥣",
    note: "tvoja potpisna rola",
  },
];

const quotes = [
  {
    text: "Ti igraš ulogu moje devojke, ja igram ulogu srećnog čoveka — oboje smo ubedljivi.",
    from: "Miki, sa balkona kao Romeo",
  },
  {
    text: "Ako je život predstava, ti si prva, druga i treća scena — a ja čekam bis.",
    from: "scenario koji nije prošao na konkursu jer je previše iskren",
  },
  {
    text: "Njen Instagram se zove @karfioluzemljihumusa — ja sam se zaljubio i u bio.",
    from: "Miki, objektivno",
  },
];

export default function LoveStats() {
  return (
    <section className="space-y-8">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-rose-500 font-semibold">
          program za večeras
        </p>
        <h2 className="font-display text-3xl md:text-4xl mt-2">
          Miki <span className="text-rose-400">×</span> Tea{" "}
          <span className="butterfly inline-block">🦋</span>
        </h2>
        <p className="text-sm text-rose-900/70 mt-1 italic">
          dve uloge, jedna predstava, nula generalnih proba
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="glass rounded-3xl p-5 text-center shadow-soft hover:shadow-lg transition"
          >
            <div className="text-3xl">{s.emoji}</div>
            <div className="font-display text-2xl text-rose-600 mt-1">
              {s.value}
            </div>
            <div className="text-xs font-semibold text-rose-900/80 mt-1">
              {s.label}
            </div>
            <div className="text-[11px] text-rose-700/60 italic mt-1">
              {s.note}
            </div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {quotes.map((q, i) => (
          <blockquote
            key={i}
            className="glass rounded-3xl p-5 shadow-soft relative"
          >
            <span className="absolute -top-3 -left-2 text-4xl text-rose-300 font-display">
              “
            </span>
            <p className="text-sm text-rose-900/85 italic leading-relaxed">
              {q.text}
            </p>
            <footer className="text-[11px] text-rose-700/70 mt-3">
              — {q.from}
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
