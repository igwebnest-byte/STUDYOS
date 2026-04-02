import { NextResponse } from "next/server";

import { listCalendarEvents } from "@/data/mock-db";

export async function GET() {
  return NextResponse.json({ events: listCalendarEvents() });
}
