"use client";

import { useIdentity } from "./IdentityProvider";

export default function IdentityBadge() {
  const me = useIdentity();
  if (!me) return null;

  function logout() {
    localStorage.removeItem("nk-user");
    window.location.href = "/";
  }

  return (
    <div className="fixed top-4 right-4 z-20 flex items-center gap-2 glass rounded-full px-3 py-1.5 text-xs shadow-soft">
      <span>{me.emoji}</span>
      <span className="font-medium text-rose-700">{me.name}</span>
      <button
        onClick={logout}
        className="text-rose-400 hover:text-rose-600 transition"
        title="Zamena korisnika"
      >
        ↻
      </button>
    </div>
  );
}
