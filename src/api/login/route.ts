import { NextRequest, NextResponse } from "next/server";
import { validateTurnstileToken } from "next-turnstile";
import { v4 } from "uuid";

export async function POST(req: NextRequest) {
  const { token } = await req.json();

  const validationResponse = await validateTurnstileToken({
    token,
    secretKey: '0x4AAAAAABCZHh9dUq996PEyiQ2gQ9rXVxg',
    // Optional: Add an idempotency key to prevent token reuse
    idempotencyKey: v4(),
    sandbox: process.env.NODE_ENV === "development",
  });

  if (!validationResponse.success) {
    return NextResponse.json({ message: "Invalid token" }, { status: 400 });
  }

  // Handle login

  return NextResponse.json({ message: "Login successful" });
}