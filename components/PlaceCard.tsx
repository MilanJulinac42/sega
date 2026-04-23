"use client";

import { useState } from "react";
import { Place, categoryMeta } from "@/lib/data";
import { postComment, postVote } from "@/lib/api";
import { useIdentity } from "./IdentityProvider";
import { formatRelative } from "@/lib/format";

type Vote = 0 | 1 | -1;

export default function PlaceCard({ place }: { place: Place }) {
  const me = useIdentity();
  const [myVote, setMyVote] = useState<Vote>(place.votes.me);
  const [herVote, setHerVote] = useState<Vote>(place.votes.her);
  const [comments, setComments] = useState(place.comments);
  const [newComment, setNewComment] = useState("");
  const [saving, setSaving] = useState(false);

  const myIdentityVote = me?.author === "me" ? myVote : herVote;
  const otherVote = me?.author === "me" ? herVote : myVote;
  const otherName = me?.author === "me" ? "Tea" : "Miki";

  const cat = categoryMeta[place.category];
  const score = (myVote === 1 ? 1 : 0) + (herVote === 1 ? 1 : 0);
  const isMatch = myVote === 1 && herVote === 1;

  async function handleVote(user: "me" | "her", value: Vote) {
    const prev = user === "me" ? myVote : herVote;
    // optimistic
    if (user === "me") setMyVote(value);
    else setHerVote(value);
    try {
      await postVote(place.id, user, value);
    } catch {
      if (user === "me") setMyVote(prev);
      else setHerVote(prev);
    }
  }

  async function submitComment(e: React.FormEvent) {
    e.preventDefault();
    const text = newComment.trim();
    if (!text || saving || !me) return;
    setSaving(true);
    try {
      const { comment } = await postComment(place.id, me.author, text);
      setComments([
        ...comments,
        { author: comment.author, text: comment.text, date: comment.createdAt },
      ]);
      setNewComment("");
    } catch {
      // ignore
    } finally {
      setSaving(false);
    }
  }

  return (
    <article className="glass rounded-3xl p-6 shadow-soft hover:shadow-lg transition-all group flex flex-col h-full">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-2xl shadow-md`}
          >
            {place.emoji}
          </div>
          <div>
            <h3 className="font-display text-xl text-rose-900">{place.name}</h3>
            <p className="text-xs text-rose-700/70">
              {cat.emoji} {cat.label} · {place.area} ·{" "}
              {"€".repeat(place.priceLevel)}
            </p>
          </div>
        </div>

        {isMatch && (
          <span className="floating text-xs font-semibold bg-gradient-to-r from-rose-500 to-fuchsia-500 text-white px-3 py-1 rounded-full">
            💞 match
          </span>
        )}
      </div>

      <p className="mt-4 text-sm text-rose-900/80 leading-relaxed line-clamp-3 min-h-[3.75rem]">
        {place.description}
      </p>

      <div className="mt-3 flex flex-wrap gap-1.5 min-h-[1.5rem]">
        {place.tags.map((t) => (
          <span
            key={t}
            className="text-[11px] bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full"
          >
            #{t}
          </span>
        ))}
      </div>

      <div className="flex-1" />

      <div className="mt-5 grid grid-cols-2 gap-3">
        <VoteBox
          label="Ti"
          emoji={me?.emoji ?? "💗"}
          vote={myIdentityVote}
          onVote={(v) => me && handleVote(me.author, v)}
          accent={
            me?.author === "her"
              ? "from-rose-100 to-rose-50"
              : "from-sky-100 to-sky-50"
          }
          active
        />
        <VoteBox
          label={otherName}
          emoji={me?.author === "me" ? "👩" : "👨"}
          vote={otherVote}
          onVote={() => {}}
          accent={
            me?.author === "me"
              ? "from-rose-100 to-rose-50"
              : "from-sky-100 to-sky-50"
          }
          active={false}
        />
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-rose-700/70">
        <span>
          ❤️ Skor: <b className="text-rose-600">{score}/2</b>
        </span>
        <span>💬 {comments.length} komentar(a)</span>
      </div>

      {comments.length > 0 && (
        <ul className="mt-3 space-y-2">
          {comments.map((c, i) => (
            <li
              key={i}
              className={`text-sm rounded-2xl px-3 py-2 ${
                c.author === "me"
                  ? "bg-sky-50 text-sky-900 mr-6"
                  : "bg-rose-50 text-rose-900 ml-6"
              }`}
            >
              <div className="flex justify-between text-[11px] opacity-60 mb-0.5">
                <span>
                  {c.author === me?.author
                    ? "Ja"
                    : c.author === "me"
                    ? "Miki"
                    : "Tea"}
                </span>
                <span>{formatRelative(c.date)}</span>
              </div>
              {c.text}
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={submitComment} className="mt-3">
        <div className="flex gap-2 min-w-0">
          <input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder={`Komentar od ${me?.nameGen ?? ""}…`}
            className="flex-1 min-w-0 rounded-xl border border-rose-200 bg-white/70 px-3 py-2 text-sm focus:outline-none focus:border-rose-400"
          />
          <button
            type="submit"
            disabled={saving || !newComment.trim()}
            className="shrink-0 rounded-xl bg-rose-500 text-white text-sm px-3 py-2 hover:bg-rose-600 transition disabled:opacity-50"
            aria-label="Pošalji komentar"
          >
            🦋
          </button>
        </div>
      </form>
    </article>
  );
}

function VoteBox({
  label,
  emoji,
  vote,
  onVote,
  accent,
  active,
}: {
  label: string;
  emoji: string;
  vote: Vote;
  onVote: (v: Vote) => void;
  accent: string;
  active: boolean;
}) {
  return (
    <div
      className={`rounded-2xl bg-gradient-to-br ${accent} p-3 flex items-center justify-between ${
        active ? "" : "opacity-80"
      }`}
    >
      <div className="text-xs font-medium">
        <span className="mr-1">{emoji}</span>
        {label}
      </div>
      <div className="flex gap-1">
        <button
          aria-label="Sviđa mi se"
          disabled={!active}
          onClick={() => onVote(vote === 1 ? 0 : 1)}
          className={`h-8 w-8 rounded-full flex items-center justify-center transition ${
            vote === 1
              ? "bg-rose-500 text-white scale-110"
              : "bg-white/70 hover:bg-white"
          } disabled:cursor-not-allowed disabled:hover:bg-white/70`}
        >
          ❤
        </button>
        <button
          aria-label="Ne sviđa mi se"
          disabled={!active}
          onClick={() => onVote(vote === -1 ? 0 : -1)}
          className={`h-8 w-8 rounded-full flex items-center justify-center transition ${
            vote === -1
              ? "bg-rose-900 text-white"
              : "bg-white/70 hover:bg-white"
          } disabled:cursor-not-allowed disabled:hover:bg-white/70`}
        >
          ✕
        </button>
      </div>
    </div>
  );
}
