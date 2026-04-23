export default function Header() {
  return (
    <header className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-20 -left-20 h-80 w-80 rounded-full bg-rose-200/60 blur-3xl" />
        <div className="absolute top-10 right-0 h-96 w-96 rounded-full bg-fuchsia-200/50 blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl px-6 pt-14 pb-10 relative">
        <span className="absolute top-10 right-10 butterfly text-4xl">🦋</span>
        <span className="absolute top-20 right-32 flower-spin text-2xl opacity-70">
          🌸
        </span>
        <span className="absolute top-6 right-56 text-2xl floating">🐱</span>

        <div className="flex items-center gap-3">
          <span className="heart-pulse text-3xl">💗</span>
          <span className="text-sm uppercase tracking-[0.3em] text-rose-500 font-semibold">
            miki × tea · premijera sezone
          </span>
        </div>

        <h1 className="mt-6 font-display text-5xl md:text-7xl leading-tight">
          Za moju{" "}
          <span className="italic text-rose-500">
            Teu <span className="butterfly inline-block">🦋</span>
          </span>
          <br />
          <span className="text-rose-900/80">ti, ja i Novi Sad.</span>
        </h1>

        <p className="mt-5 max-w-2xl text-lg text-rose-900/70">
          Mala platforma samo za nas dvoje — mesta, svirke, šetnje i ideje za
          dejt. Glasaj šta ti se dopada, ostavi komentar, i neka sledeći izlazak
          bude najbolji do sad.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="#mesta"
            className="inline-flex items-center gap-2 rounded-full bg-rose-500 px-6 py-3 text-white font-medium shadow-soft hover:bg-rose-600 transition"
          >
            🦋 Glasaj sa mnom
          </a>
          <a
            href="#predlog"
            className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-rose-700 font-medium hover:bg-white transition"
          >
            🌸 Predloži dejt
          </a>
        </div>

        <div className="mt-6 paw-trail flex gap-2 text-rose-400/80 text-lg">
          <span>🐾</span>
          <span>🐾</span>
          <span>🐾</span>
          <span>🐾</span>
        </div>
      </div>
    </header>
  );
}
