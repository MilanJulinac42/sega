import { NextRequest, NextResponse } from "next/server";
import { listPlaces, createPlace } from "@/lib/store";
import { Category } from "@/lib/data";

const VALID_CATEGORIES: Category[] = [
  "restoran",
  "svirka",
  "setnja",
  "kafa",
  "aktivnost",
];

export async function GET() {
  try {
    const places = await listPlaces();
    return NextResponse.json({ places });
  } catch (e: any) {
    console.error("GET /api/places failed:", e);
    return NextResponse.json(
      {
        error: e?.message ?? "unknown",
        code: e?.code,
        hint: e?.hint,
        details: e?.details,
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const name = (body.name ?? "").toString().trim();
    const category = body.category as Category;
    const area = (body.area ?? "").toString().trim();
    const description = (body.description ?? "").toString().trim();
    const emoji = (body.emoji ?? "📍").toString().trim() || "📍";
    const priceLevel = Number(body.priceLevel);
    const tags = Array.isArray(body.tags)
      ? body.tags.map((t: unknown) => String(t).trim()).filter(Boolean)
      : [];
    const lat = body.lat != null ? Number(body.lat) : null;
    const lng = body.lng != null ? Number(body.lng) : null;

    if (!name) return NextResponse.json({ error: "name required" }, { status: 400 });
    if (!VALID_CATEGORIES.includes(category))
      return NextResponse.json({ error: "invalid category" }, { status: 400 });
    if (!area) return NextResponse.json({ error: "area required" }, { status: 400 });
    if (!description)
      return NextResponse.json({ error: "description required" }, { status: 400 });
    if (![1, 2, 3].includes(priceLevel))
      return NextResponse.json({ error: "invalid priceLevel" }, { status: 400 });

    const place = await createPlace({
      name,
      category,
      area,
      description,
      emoji,
      priceLevel: priceLevel as 1 | 2 | 3,
      tags,
      lat,
      lng,
    });

    return NextResponse.json({ place });
  } catch (e: any) {
    console.error("POST /api/places failed:", e);
    return NextResponse.json(
      {
        error: e?.message ?? "unknown",
        code: e?.code,
        hint: e?.hint,
        details: e?.details,
      },
      { status: 500 }
    );
  }
}
