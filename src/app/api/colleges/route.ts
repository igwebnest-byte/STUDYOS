import { NextResponse } from "next/server";

import {
  addCollegeRequest,
  getSelectedCollegeForUser,
  listCollegeRequests,
  listColleges,
  setSelectedCollegeForUser,
} from "@/data/mock-db";
import type { CollegeRequest } from "@/types";

interface CollegesBody {
  action?: "select" | "request";
  email?: string;
  collegeId?: string;
  name?: string;
  city?: string;
  state?: string;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const email = url.searchParams.get("email") ?? "";

  return NextResponse.json({
    colleges: listColleges(),
    requests: listCollegeRequests(),
    selectedCollegeId: email ? getSelectedCollegeForUser(email) : undefined,
  });
}

export async function POST(request: Request) {
  const body = (await request.json()) as CollegesBody;

  if (!body.action || !body.email) {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  if (body.action === "select") {
    if (!body.collegeId) {
      return NextResponse.json({ message: "collegeId is required for selection." }, { status: 400 });
    }

    setSelectedCollegeForUser(body.email, body.collegeId);
    return NextResponse.json({ message: "College selected." });
  }

  if (!body.name || !body.city || !body.state) {
    return NextResponse.json({ message: "Name, city, and state are required." }, { status: 400 });
  }

  const requestItem: CollegeRequest = {
    id: `request-${crypto.randomUUID()}`,
    name: body.name,
    city: body.city,
    state: body.state,
    requestedBy: body.email,
    requestedAt: new Date().toISOString().slice(0, 10),
    status: "pending",
  };

  addCollegeRequest(requestItem);

  return NextResponse.json({ message: "College request submitted.", request: requestItem }, { status: 201 });
}
