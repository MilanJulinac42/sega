import { NextRequest, NextResponse } from "next/server";
import { setVote } from "@/lib/store";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const user = body.user;
  const value = body.value;

  if (user !== "me" && user !== "her") {
    return NextResponse.json({ error: "invalid user" }, { status: 400 });
  }
  if (![-1, 0, 1].includes(value)) {
    return NextResponse.json({ error: "invalid value" }, { status: 400 });
  }

  const state = await setVote(params.id, user, value);
  return NextResponse.json({ votes: state.votes });
}
