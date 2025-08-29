"use server";
import { neon } from "@neondatabase/serverless";

const sql = neon(`${process.env.DATABASE_URL}`);

export async function getMember() {
  const data = await sql`SELECT * FROM public.member`;
  return data;
}

// メンバーの追加
export async function addMember(formData: FormData) {
  const name = formData.get("name") as string;
  const participate = formData.get("participate") === "on";

  const result = await sql`
    INSERT INTO member (name, participate)
    VALUES (${name}, ${participate})
    RETURNING *;
  `;

  return result[0];
}
