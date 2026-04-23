"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { Author } from "@/lib/api";

type Identity = {
  author: Author;
  name: string;
  /** genitive — "od Mikija / od Teodore" */
  nameGen: string;
  emoji: string;
};

const IdentityCtx = createContext<Identity | null>(null);

const MIKI: Identity = {
  author: "me",
  name: "Miki",
  nameGen: "Mikija",
  emoji: "👨",
};
const TEA: Identity = {
  author: "her",
  name: "Tea",
  nameGen: "Teodore",
  emoji: "👩",
};

function fromSlug(slug: string | null): Identity | null {
  if (!slug) return null;
  const s = slug.toLowerCase();
  if (s === "miki" || s === "milan" || s === "me") return MIKI;
  if (s === "tea" || s === "teodora" || s === "her") return TEA;
  return null;
}

export function IdentityProvider({ children }: { children: ReactNode }) {
  const [identity, setIdentity] = useState<Identity | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fromUrl = fromSlug(params.get("user"));
    if (fromUrl) {
      localStorage.setItem("nk-user", fromUrl.author);
      setIdentity(fromUrl);
      return;
    }
    const saved = localStorage.getItem("nk-user");
    if (saved === "me") setIdentity(MIKI);
    else if (saved === "her") setIdentity(TEA);
  }, []);

  return (
    <IdentityCtx.Provider value={identity}>{children}</IdentityCtx.Provider>
  );
}

export function useIdentity(): Identity | null {
  return useContext(IdentityCtx);
}
