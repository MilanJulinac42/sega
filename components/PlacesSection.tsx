"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { Place, Category } from "@/lib/data";
import { fetchPlaces } from "@/lib/api";
import CategoryTabs from "./CategoryTabs";
import PlaceCard from "./PlaceCard";
import AddPlaceForm from "./AddPlaceForm";

const PlacesMap = dynamic(() => import("./PlacesMap"), {
  ssr: false,
  loading: () => (
    <div className="glass rounded-3xl h-[500px] animate-pulse opacity-60" />
  ),
});

export default function PlacesSection() {
  const [active, setActive] = useState<Category | "sve">("sve");
  const [query, setQuery] = useState("");
  const [places, setPlaces] = useState<Place[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showMap, setShowMap] = useState(true);

  const load = useCallback(() => {
    fetchPlaces()
      .then(setPlaces)
      .catch((e) => setError(e.message));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const filtered = useMemo(() => {
    if (!places) return [];
    return places.filter((p) => {
      const matchCat = active === "sve" || p.category === active;
      const q = query.trim().toLowerCase();
      const matchQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.area.toLowerCase().includes(q) ||
        p.tags.some((t) => t.includes(q));
      return matchCat && matchQuery;
    });
  }, [active, query, places]);

  return (
    <section id="mesta" className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-3xl">Naša mesta</h2>
          <p className="text-sm text-rose-900/70 mt-1">
            Glasaj sa ❤, ostavi komentar, i kad se oboje složimo — dobijamo
            <span className="text-rose-600 font-semibold"> match 💞</span>.
          </p>
        </div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="🔎 Pretraži (npr. Petrovaradin, vino…)"
          className="w-full md:w-72 rounded-full glass px-4 py-2.5 text-sm focus:outline-none focus:border-rose-400"
        />
      </div>

      {places && (
        <>
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <button
              onClick={() => setShowMap((s) => !s)}
              className="text-sm text-rose-700 glass rounded-full px-4 py-2 hover:bg-white transition"
            >
              {showMap ? "🗺️ Sakrij mapu" : "🗺️ Prikaži mapu"}
            </button>
            <AddPlaceForm onAdded={load} />
          </div>

          {showMap && <PlacesMap places={filtered} />}
        </>
      )}

      <CategoryTabs active={active} onChange={setActive} />

      {error && (
        <p className="text-sm text-red-600 bg-red-50 rounded-xl px-4 py-2">
          Greška: {error}
        </p>
      )}

      {!places && !error && (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="glass rounded-3xl p-6 h-80 animate-pulse opacity-60"
            />
          ))}
        </div>
      )}

      {places && (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filtered.map((p) => (
            <PlaceCard key={p.id} place={p} />
          ))}
        </div>
      )}

      {places && filtered.length === 0 && (
        <p className="text-center text-rose-700/70 py-10">
          Ništa nije nađeno 💭 — probaj drugu pretragu.
        </p>
      )}
    </section>
  );
}
