"use server";
import { neon } from "@neondatabase/serverless";

export async function getMember() {
  const sql = neon(`${process.env.DATABASE_URL}`);
  const data = await sql`SELECT * FROM public.member`;
  return data;
}
