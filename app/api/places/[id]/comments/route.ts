import { NextRequest, NextResponse } from "next/server";
import { addComment } from "@/lib/store";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const author = body.author;
  const text = (body.text ?? "").toString().trim();

  if (author !== "me" && author !== "her") {
    return NextResponse.json({ error: "invalid author" }, { status: 400 });
  }
  if (!text) {
    return NextResponse.json({ error: "empty text" }, { status: 400 });
  }

  const comment = await addComment(params.id, author, text);
  return NextResponse.json({ comment });
}
