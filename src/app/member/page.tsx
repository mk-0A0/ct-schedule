import { getMember } from "@/src/app/actions";
import { AddMemberFormDialog } from "@/src/app/components/AddMemberFormDialog";
import { EditMemberForm } from "@/src/app/components/EditMemberForm";
import { Separator } from "@/src/app/components/ui/separator";
import { Fragment } from "react";

export default async function Home() {
  const memberData = await getMember();
  return (
    <main className="grid gap-10 max-w-7xl mx-auto p-10">
      <div className="flex justify-between items-center gap-10">
        <h1 className="text-2xl font-bold">メンバー一覧</h1>
        <AddMemberFormDialog />
      </div>
      <section className="grid gap-3">
        {memberData.map((member) => (
          <Fragment key={member.id}>
            <EditMemberForm key={member.id} member={member} />
            <Separator />
          </Fragment>
        ))}
      </section>
    </main>
  );
}
