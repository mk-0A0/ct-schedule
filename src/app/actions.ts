"use server";
import { neon } from "@neondatabase/serverless";

function getDataBaseUrl() {
  if (process.env.NODE_ENV === "development") {
    return `${process.env.DATABASE_URL_DEV}`;
  }
  if (process.env.VERCEL_ENV === "preview") {
    return `${process.env.DATABASE_URL}`;
  }
  return `${process.env.DATABASE_URL}`;
}

const sql = neon(getDataBaseUrl());

export type Member = {
  id: number;
  name: string;
  participate: boolean;
};

export async function getMember(): Promise<Member[]> {
  const data = await sql`
    SELECT * FROM public.member
    ORDER BY id ASC
  `;
  return data as Member[];
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
