import { NextResponse } from "next/server";

export async function GET() {
  const members = ["🐱", "🐶", "🐷", "🐭", "🐹"];
  return NextResponse.json({ members });
}
