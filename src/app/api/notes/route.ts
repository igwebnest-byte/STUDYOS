import { NextResponse } from "next/server";

import { addNote, listNotes } from "@/data/mock-db";
import type { NoteAsset } from "@/types";

interface NotesBody {
  title?: string;
  subject?: string;
  type?: "note" | "pyq";
  fileUrl?: string;
}

export async function GET() {
  return NextResponse.json({ items: listNotes() });
}

export async function POST(request: Request) {
  const body = (await request.json()) as NotesBody;

  if (!body.title || !body.subject || !body.type || !body.fileUrl) {
    return NextResponse.json({ message: "Missing note details." }, { status: 400 });
  }

  const item: NoteAsset = {
    id: `note-${crypto.randomUUID()}`,
    title: body.title,
    subject: body.subject,
    type: body.type,
    fileUrl: body.fileUrl,
    uploadedAt: new Date().toISOString().slice(0, 10),
  };

  addNote(item);

  return NextResponse.json({ item }, { status: 201 });
}
