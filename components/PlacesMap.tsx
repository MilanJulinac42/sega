"use client";

import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Place, categoryMeta } from "@/lib/data";

export default function PlacesMap({ places }: { places: Place[] }) {
  const withCoords = places.filter(
    (p) => typeof p.lat === "number" && typeof p.lng === "number"
  );

  const center: [number, number] =
    withCoords.length > 0
      ? [withCoords[0].lat!, withCoords[0].lng!]
      : [45.2538, 19.8469]; // Novi Sad default

  return (
    <div className="rounded-3xl overflow-hidden shadow-soft glass p-2">
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: "450px", width: "100%", borderRadius: "1.25rem" }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {withCoords.map((p) => {
          const isMatch = p.votes.me === 1 && p.votes.her === 1;
          const mikiLike = p.votes.me === 1;
          const teaLike = p.votes.her === 1;
          const color = isMatch
            ? "#f43f6b" // match: rose
            : mikiLike && teaLike
            ? "#f43f6b"
            : mikiLike
            ? "#38bdf8" // sky blue — miki only
            : teaLike
            ? "#fb7185" // pink — tea only
            : "#a8a29e"; // neutral

          return (
            <CircleMarker
              key={p.id}
              center={[p.lat!, p.lng!]}
              radius={isMatch ? 14 : 10}
              pathOptions={{
                color: "#fff",
                weight: 2,
                fillColor: color,
                fillOpacity: 0.9,
              }}
            >
              <Popup>
                <div className="text-sm">
                  <div className="font-semibold text-base">
                    {p.emoji} {p.name}
                  </div>
                  <div className="text-xs text-rose-700/80">
                    {categoryMeta[p.category].emoji}{" "}
                    {categoryMeta[p.category].label} · {p.area}
                  </div>
                  <div className="mt-1 text-xs">
                    Miki: {p.votes.me === 1 ? "❤" : p.votes.me === -1 ? "✕" : "—"}
                    {"  "}
                    Tea: {p.votes.her === 1 ? "❤" : p.votes.her === -1 ? "✕" : "—"}
                  </div>
                  {isMatch && (
                    <div className="mt-1 text-rose-600 font-semibold">
                      💞 match
                    </div>
                  )}
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>

      <div className="flex flex-wrap gap-3 text-xs px-2 py-3 text-rose-900/80">
        <Legend color="#f43f6b" label="💞 match" />
        <Legend color="#38bdf8" label="samo Miki" />
        <Legend color="#fb7185" label="samo Tea" />
        <Legend color="#a8a29e" label="bez glasa" />
      </div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className="inline-block h-3 w-3 rounded-full border-2 border-white"
        style={{ backgroundColor: color, boxShadow: "0 0 0 1px rgba(0,0,0,.08)" }}
      />
      {label}
    </span>
  );
}
