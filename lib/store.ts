import { getSupabase } from "./supabase";
import { Place, Category } from "./data";

type Author = "me" | "her";
type VoteValue = -1 | 0 | 1;

export type Comment = {
  id: string;
  placeId: string;
  author: Author;
  text: string;
  createdAt: string;
};

export type DateProposal = {
  id: string;
  when: string;
  where: string;
  note: string;
  author: Author;
  status: "pending" | "accepted" | "declined";
  createdAt: string;
};

type PlaceRow = {
  id: string;
  name: string;
  category: Category;
  area: string;
  description: string;
  emoji: string;
  price_level: 1 | 2 | 3;
  tags: string[];
  lat: number | null;
  lng: number | null;
};

type VoteRow = { place_id: string; author: Author; value: VoteValue };
type CommentRow = {
  id: string;
  place_id: string;
  author: Author;
  text: string;
  created_at: string;
};

export async function listPlaces(): Promise<Place[]> {
  const [placesRes, votesRes, commentsRes] = await Promise.all([
    getSupabase().from("places").select("*").order("id"),
    getSupabase().from("votes").select("*"),
    getSupabase().from("comments").select("*").order("created_at"),
  ]);

  if (placesRes.error) throw placesRes.error;
  if (votesRes.error) throw votesRes.error;
  if (commentsRes.error) throw commentsRes.error;

  const votes = (votesRes.data ?? []) as VoteRow[];
  const comments = (commentsRes.data ?? []) as CommentRow[];

  return (placesRes.data as PlaceRow[]).map((row) => {
    const myVote = votes.find((v) => v.place_id === row.id && v.author === "me");
    const herVote = votes.find((v) => v.place_id === row.id && v.author === "her");
    return {
      id: row.id,
      name: row.name,
      category: row.category,
      area: row.area,
      description: row.description,
      emoji: row.emoji,
      priceLevel: row.price_level,
      tags: row.tags ?? [],
      lat: row.lat,
      lng: row.lng,
      votes: {
        me: (myVote?.value ?? 0) as VoteValue,
        her: (herVote?.value ?? 0) as VoteValue,
      },
      comments: comments
        .filter((c) => c.place_id === row.id)
        .map((c) => ({
          author: c.author,
          text: c.text,
          date: c.created_at,
        })),
    };
  });
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
  const id = `p-${Date.now()}`;
  const { error } = await getSupabase().from("places").insert({
    id,
    name: input.name,
    category: input.category,
    area: input.area,
    description: input.description,
    emoji: input.emoji,
    price_level: input.priceLevel,
    tags: input.tags,
    lat: input.lat ?? null,
    lng: input.lng ?? null,
  });
  if (error) throw error;
  return {
    id,
    name: input.name,
    category: input.category,
    area: input.area,
    description: input.description,
    emoji: input.emoji,
    priceLevel: input.priceLevel,
    tags: input.tags,
    lat: input.lat ?? null,
    lng: input.lng ?? null,
    votes: { me: 0, her: 0 },
    comments: [],
  };
}

export async function setVote(
  placeId: string,
  user: Author,
  value: VoteValue
) {
  const { error } = await getSupabase()
    .from("votes")
    .upsert(
      { place_id: placeId, author: user, value, updated_at: new Date().toISOString() },
      { onConflict: "place_id,author" }
    );
  if (error) throw error;

  const { data, error: readErr } = await getSupabase()
    .from("votes")
    .select("*")
    .eq("place_id", placeId);
  if (readErr) throw readErr;

  const rows = (data ?? []) as VoteRow[];
  return {
    votes: {
      me: (rows.find((r) => r.author === "me")?.value ?? 0) as VoteValue,
      her: (rows.find((r) => r.author === "her")?.value ?? 0) as VoteValue,
    },
  };
}

export async function addComment(
  placeId: string,
  author: Author,
  text: string
): Promise<Comment> {
  const { data, error } = await getSupabase()
    .from("comments")
    .insert({ place_id: placeId, author, text: text.trim() })
    .select()
    .single();
  if (error) throw error;
  const row = data as CommentRow;
  return {
    id: row.id,
    placeId: row.place_id,
    author: row.author,
    text: row.text,
    createdAt: row.created_at,
  };
}

export async function listProposals(): Promise<DateProposal[]> {
  const { data, error } = await getSupabase()
    .from("date_proposals")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;

  return (data ?? []).map((r: any) => ({
    id: r.id,
    author: r.author,
    when: r.when,
    where: r.where,
    note: r.note ?? "",
    status: r.status,
    createdAt: r.created_at,
  }));
}

export async function createProposal(input: {
  when: string;
  where: string;
  note: string;
  author: Author;
}): Promise<DateProposal> {
  const { data, error } = await getSupabase()
    .from("date_proposals")
    .insert({
      author: input.author,
      when: input.when,
      where: input.where,
      note: input.note ?? "",
    })
    .select()
    .single();
  if (error) throw error;
  const r: any = data;
  return {
    id: r.id,
    author: r.author,
    when: r.when,
    where: r.where,
    note: r.note ?? "",
    status: r.status,
    createdAt: r.created_at,
  };
}
