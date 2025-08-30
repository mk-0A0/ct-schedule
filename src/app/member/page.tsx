import { getMember } from "@/app/actions";

export default async function Home() {
  const memberData = await getMember();

  return (
    <main className="max-w-7xl mx-auto p-10">
      <h1 className="text-2xl font-bold">メンバー一覧</h1>
      {memberData.map((member) => (
        <p key={member.id}>{member.name}</p>
      ))}
    </main>
  );
}
