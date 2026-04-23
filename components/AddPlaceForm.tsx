"use client";

import { useState } from "react";
import { Category, categoryMeta } from "@/lib/data";
import { createPlace } from "@/lib/api";

const CATS: Category[] = ["restoran", "svirka", "setnja", "kafa", "aktivnost"];

export default function AddPlaceForm({
  onAdded,
}: {
  onAdded: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState<Category>("restoran");
  const [area, setArea] = useState("");
  const [description, setDescription] = useState("");
  const [emoji, setEmoji] = useState("📍");
  const [priceLevel, setPriceLevel] = useState<1 | 2 | 3>(1);
  const [tags, setTags] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function reset() {
    setName("");
    setArea("");
    setDescription("");
    setEmoji("📍");
    setPriceLevel(1);
    setTags("");
    setLat("");
    setLng("");
    setError(null);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (saving) return;
    setSaving(true);
    setError(null);
    try {
      await createPlace({
        name,
        category,
        area,
        description,
        emoji,
        priceLevel,
        tags: tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        lat: lat ? Number(lat) : null,
        lng: lng ? Number(lng) : null,
      });
      reset();
      setOpen(false);
      onAdded();
    } catch (e: any) {
      setError(e.message ?? "greška");
    } finally {
      setSaving(false);
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="rounded-full bg-rose-500 text-white px-5 py-2.5 text-sm font-medium hover:bg-rose-600 transition shadow-soft"
      >
        ➕ Dodaj mesto
      </button>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="glass rounded-3xl p-6 shadow-soft space-y-3"
    >
      <div className="flex items-center justify-between">
        <h3 className="font-display text-xl">Novo mesto</h3>
        <button
          type="button"
          onClick={() => {
            setOpen(false);
            reset();
          }}
          className="text-rose-400 hover:text-rose-600 text-xl"
          aria-label="Zatvori"
        >
          ×
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        <Field label="Ime">
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputCls}
          />
        </Field>

        <Field label="Kategorija">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className={inputCls}
          >
            {CATS.map((c) => (
              <option key={c} value={c}>
                {categoryMeta[c].emoji} {categoryMeta[c].label}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Lokacija / kraj">
          <input
            required
            value={area}
            onChange={(e) => setArea(e.target.value)}
            placeholder="npr. Centar, Zmaj Jovina"
            className={inputCls}
          />
        </Field>

        <Field label="Emoji">
          <input
            value={emoji}
            onChange={(e) => setEmoji(e.target.value)}
            maxLength={4}
            className={inputCls}
          />
        </Field>

        <Field label="Opis" colSpan>
          <textarea
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            className={`${inputCls} resize-none`}
          />
        </Field>

        <Field label="Cena">
          <div className="flex gap-1">
            {[1, 2, 3].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setPriceLevel(n as 1 | 2 | 3)}
                className={`flex-1 rounded-xl py-2 text-sm transition ${
                  priceLevel === n
                    ? "bg-rose-500 text-white"
                    : "bg-white/70 text-rose-700 hover:bg-white"
                }`}
              >
                {"€".repeat(n)}
              </button>
            ))}
          </div>
        </Field>

        <Field label="Tagovi (zarezom)">
          <input
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="romantično, vino, večera"
            className={inputCls}
          />
        </Field>

        <Field label="Lat (opciono)">
          <input
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            placeholder="45.2538"
            className={inputCls}
          />
        </Field>

        <Field label="Lng (opciono)">
          <input
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            placeholder="19.8469"
            className={inputCls}
          />
        </Field>
      </div>

      <p className="text-[11px] text-rose-700/60">
        Koordinate: desni klik u Google Maps → „Šta je ovde?" → kopiraj dva
        broja.
      </p>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 rounded-xl px-3 py-2">
          Greška: {error}
        </p>
      )}

      <div className="flex gap-2 pt-1">
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-rose-500 text-white px-6 py-2.5 font-medium hover:bg-rose-600 transition disabled:opacity-50"
        >
          {saving ? "Čuvam…" : "Sačuvaj mesto 💗"}
        </button>
      </div>
    </form>
  );
}

const inputCls =
  "w-full rounded-xl border border-rose-200 bg-white/80 px-3 py-2 text-sm focus:outline-none focus:border-rose-400";

function Field({
  label,
  children,
  colSpan,
}: {
  label: string;
  children: React.ReactNode;
  colSpan?: boolean;
}) {
  return (
    <label
      className={`flex flex-col gap-1 text-sm ${colSpan ? "md:col-span-2" : ""}`}
    >
      <span className="text-rose-700/80 text-xs">{label}</span>
      {children}
    </label>
  );
}
