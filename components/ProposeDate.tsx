"use client";

import { useEffect, useState } from "react";
import { fetchProposals, postProposal, Author } from "@/lib/api";
import { useIdentity } from "./IdentityProvider";

type Proposal = {
  id: string;
  when: string;
  where: string;
  note: string;
  author: Author;
  status: string;
  createdAt: string;
};

export default function ProposeDate() {
  const me = useIdentity();
  const [when, setWhen] = useState("");
  const [where, setWhere] = useState("");
  const [note, setNote] = useState("");
  const [sent, setSent] = useState(false);
  const [saving, setSaving] = useState(false);
  const [proposals, setProposals] = useState<Proposal[]>([]);

  async function loadProposals() {
    try {
      const data = await fetchProposals();
      setProposals(data.proposals);
    } catch {
      // ignore
    }
  }

  useEffect(() => {
    loadProposals();
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!when || !where || saving || !me) return;
    setSaving(true);
    try {
      await postProposal({ when, where, note, author: me.author });
      setSent(true);
      setTimeout(() => setSent(false), 4000);
      setWhen("");
      setWhere("");
      setNote("");
      loadProposals();
    } catch {
      // ignore
    } finally {
      setSaving(false);
    }
  }

  return (
    <section
      id="predlog"
      className="glass rounded-3xl p-8 shadow-soft relative overflow-hidden"
    >
      <div className="absolute -right-10 -top-10 text-[160px] opacity-10 select-none">
        💌
      </div>

      <h2 className="font-display text-3xl">Predloži dejt</h2>
      <p className="text-sm text-rose-900/70 mt-1">
        Baci ideju — drugi odgovara sa ❤ ili predlaže drugi termin.
      </p>

      <form onSubmit={submit} className="mt-6 grid md:grid-cols-2 gap-4">
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-rose-700/80">Kad?</span>
          <input
            type="datetime-local"
            value={when}
            onChange={(e) => setWhen(e.target.value)}
            className="rounded-xl border border-rose-200 bg-white/80 px-3 py-2.5 focus:outline-none focus:border-rose-400"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm">
          <span className="text-rose-700/80">Gde?</span>
          <input
            value={where}
            onChange={(e) => setWhere(e.target.value)}
            placeholder="npr. Kafeterija, Zmaj Jovina"
            className="rounded-xl border border-rose-200 bg-white/80 px-3 py-2.5 focus:outline-none focus:border-rose-400"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm md:col-span-2">
          <span className="text-rose-700/80">Poruka (opciono)</span>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            placeholder="Obuci onu plavu haljinu 😉"
            className="rounded-xl border border-rose-200 bg-white/80 px-3 py-2.5 focus:outline-none focus:border-rose-400 resize-none"
          />
        </label>

        <div className="md:col-span-2 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <p className="text-xs text-rose-700/70">
            Šalje: <span className="font-semibold">{me?.name}</span> {me?.emoji}
          </p>

          <button
            type="submit"
            disabled={saving}
            className="rounded-full bg-rose-500 text-white px-6 py-2.5 font-medium hover:bg-rose-600 transition shadow-soft disabled:opacity-50"
          >
            {saving ? "Šaljem…" : "Pošalji predlog 💗"}
          </button>
        </div>

        {sent && (
          <p className="md:col-span-2 text-sm text-emerald-700 bg-emerald-50 rounded-xl px-4 py-2 text-center">
            Predlog poslat! Čekamo potvrdu ✨
          </p>
        )}
      </form>

      {proposals.length > 0 && (
        <div className="mt-8">
          <h3 className="font-display text-xl mb-3">Predlozi 💌</h3>
          <ul className="space-y-2">
            {proposals.map((p) => (
              <li
                key={p.id}
                className="rounded-2xl bg-white/60 px-4 py-3 text-sm flex flex-wrap items-center justify-between gap-2"
              >
                <div>
                  <span className="font-semibold">
                    {p.author === "me" ? "Miki" : "Tea"}
                  </span>{" "}
                  · {new Date(p.when).toLocaleString("sr-RS")} ·{" "}
                  <span className="text-rose-700">{p.where}</span>
                  {p.note && (
                    <div className="text-xs text-rose-900/70 italic mt-0.5">
                      „{p.note}”
                    </div>
                  )}
                </div>
                <span className="text-[11px] rounded-full bg-rose-100 text-rose-700 px-2 py-0.5">
                  {p.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
