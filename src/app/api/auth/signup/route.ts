import { NextResponse } from "next/server";

import { addUser, findUserByEmail, getSafeUser } from "@/data/mock-db";

interface SignupBody {
  name?: string;
  email?: string;
  password?: string;
  collegeId?: string;
}

export async function POST(request: Request) {
  const body = (await request.json()) as SignupBody;

  if (!body.name || !body.email || !body.password) {
    return NextResponse.json({ message: "Name, email, and password are required." }, { status: 400 });
  }

  if (body.password.length < 6) {
    return NextResponse.json({ message: "Password must be at least 6 characters." }, { status: 400 });
  }

  if (findUserByEmail(body.email)) {
    return NextResponse.json({ message: "Email is already registered." }, { status: 409 });
  }

  const account = addUser({
    id: `user-${crypto.randomUUID()}`,
    name: body.name,
    email: body.email,
    password: body.password,
    collegeId: body.collegeId,
  });

  const token = Buffer.from(`${account.id}:${Date.now()}`).toString("base64");

  return NextResponse.json({
    token,
    user: getSafeUser(account),
  });
}
