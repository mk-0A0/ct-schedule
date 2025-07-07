import { NextResponse } from "next/server";

export type Member = {
  name: string;
};

export async function GET() {
  const members: Member[] = [
    { name: "🐱" },
    { name: "🐶" },
    { name: "🐷" },
    { name: "🐭" },
    { name: "🐹" },
  ];
  return NextResponse.json({ members });
}
