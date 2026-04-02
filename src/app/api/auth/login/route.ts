import { NextResponse } from "next/server";

import { findUserByEmail, getSafeUser } from "@/data/mock-db";

interface LoginBody {
  email?: string;
  password?: string;
}

export async function POST(request: Request) {
  const body = (await request.json()) as LoginBody;

  if (!body.email || !body.password) {
    return NextResponse.json({ message: "Email and password are required." }, { status: 400 });
  }

  const account = findUserByEmail(body.email);
  if (!account || account.password !== body.password) {
    return NextResponse.json({ message: "Invalid email or password." }, { status: 401 });
  }

  const token = Buffer.from(`${account.id}:${Date.now()}`).toString("base64");

  return NextResponse.json({
    token,
    user: getSafeUser(account),
  });
}
