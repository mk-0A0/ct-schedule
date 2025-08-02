import { NextResponse } from "next/server";

export type Member = {
  name: string;
};

export async function GET() {
  const members: Member[] = [
    { name: "tobotoboto" },
    { name: "semigura" },
    { name: "harembi" },
    { name: "hchaki" },
    { name: "yubune" },
    { name: "mk-0A0" },
    { name: "tsuji-108" },
    { name: "mach3" },
    { name: "thkt" },
    { name: "sena-m09" },
    { name: "asato-yoshizawa" },
    { name: "nakaji" },
    { name: "hikari-tanimoto" },
    { name: "t-kobayashi-glb" },
    { name: "takumibv" },
    { name: "aito-ika" },
    { name: "hanaky" },
    { name: "tom-chiba" },
    { name: "it-s-you" },
    { name: "kinjo3" },
  ];
  return NextResponse.json({ members });
}
