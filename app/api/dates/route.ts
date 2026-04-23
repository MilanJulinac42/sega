import { NextRequest, NextResponse } from "next/server";
import { createProposal, listProposals } from "@/lib/store";

export async function GET() {
  const proposals = await listProposals();
  return NextResponse.json({ proposals });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const when = (body.when ?? "").toString();
  const where = (body.where ?? "").toString().trim();
  const note = (body.note ?? "").toString().trim();
  const author = body.author;

  if (!when || !where) {
    return NextResponse.json({ error: "when & where required" }, { status: 400 });
  }
  if (author !== "me" && author !== "her") {
    return NextResponse.json({ error: "invalid author" }, { status: 400 });
  }

  const proposal = await createProposal({ when, where, note, author });
  return NextResponse.json({ proposal });
}
