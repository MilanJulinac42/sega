import { Place, Category } from "./data";

export type Author = "me" | "her";
export type VoteValue = -1 | 0 | 1;

export async function fetchPlaces(): Promise<Place[]> {
  const res = await fetch("/api/places", { cache: "no-store" });
  if (!res.ok) throw new Error("failed to load places");
  const data = await res.json();
  return data.places;
}

export async function postVote(
  placeId: string,
  user: Author,
  value: VoteValue
) {
  const res = await fetch(`/api/places/${placeId}/vote`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user, value }),
  });
  if (!res.ok) throw new Error("vote failed");
  return res.json();
}

export async function postComment(
  placeId: string,
  author: Author,
  text: string
) {
  const res = await fetch(`/api/places/${placeId}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ author, text }),
  });
  if (!res.ok) throw new Error("comment failed");
  return res.json();
}

export async function postProposal(payload: {
  when: string;
  where: string;
  note: string;
  author: Author;
}) {
  const res = await fetch("/api/dates", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("proposal failed");
  return res.json();
}

export async function createPlace(input: {
  name: string;
  category: Category;
  area: string;
  description: string;
  emoji: string;
  priceLevel: 1 | 2 | 3;
  tags: string[];
  lat?: number | null;
  lng?: number | null;
}): Promise<Place> {
  const res = await fetch("/api/places", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error("create place failed");
  const data = await res.json();
  return data.place;
}

export async function fetchProposals() {
  const res = await fetch("/api/dates", { cache: "no-store" });
  if (!res.ok) throw new Error("failed to load proposals");
  return res.json();
}
