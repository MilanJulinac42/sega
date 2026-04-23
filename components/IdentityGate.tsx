"use client";

import { useIdentity } from "./IdentityProvider";

export default function IdentityGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const me = useIdentity();

  if (!me) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="glass rounded-3xl p-10 shadow-soft text-center max-w-md">
          <div className="text-5xl mb-3">💗</div>
          <h1 className="font-display text-3xl mb-2">Ko si ti?</h1>
          <p className="text-sm text-rose-900/70 mb-6">
            Otvori sa svojim linkom — svako ima svoj.
          </p>
          <div className="flex flex-col gap-2">
            <a
              href="/?user=miki"
              className="rounded-full bg-sky-500 text-white py-3 font-medium hover:bg-sky-600 transition"
            >
              👨 Ja sam Miki
            </a>
            <a
              href="/?user=tea"
              className="rounded-full bg-rose-500 text-white py-3 font-medium hover:bg-rose-600 transition"
            >
              👩 Ja sam Tea
            </a>
          </div>
          <p className="text-[11px] text-rose-700/50 mt-6">
            Dodaj u bookmark — bićeš zapamćen na ovom uređaju.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
