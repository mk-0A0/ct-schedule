"use client";

import { Member, updateMember } from "@/app/actions";
import { Button } from "@/app/components/ui/button";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { PencilLine } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const EditMemberRow = ({ member }: { member: Member }) => {
  const router = useRouter();
  const [edit, setEdit] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    try {
      const id = Number(formData.get("id"));
      const name = String(formData.get("name"));
      const participate = formData.get("participate") === "on";
      await updateMember(id, name, participate);
      setEdit(false);
      toast.success("更新しました");
      router.refresh();
    } catch (error) {
      toast.error("メンバーの更新に失敗しました");
      console.error("Error updating member:", error);
    }
  };

  return edit ? (
    <form action={handleSubmit} key={member.id}>
      <Input type="hidden" name="id" value={member.id} />
          <Input
            name="name"
            id="name"
            key={member.id}
            value={member.name}
            onChange={() => {}}
          />
          <Checkbox
            name="participate"
            id="participate"
            className="inline-block ml-2"
            checked={member.participate}
            onChange={() => {}}
          />
          <Label htmlFor="participate">CTに参加する</Label>
          <Button type="submit">保存</Button>
          <Button onClick={() => setEdit(false)} variant="outline">
            キャンセル
          </Button>
        </form>
      ) : (
        <div className="flex">
          <p key={member.id}>
            {member.name}: {String(member.participate)}
          </p>
          <Button variant="ghost" onClick={() => setEdit(!edit)} size="icon">
            <PencilLine />
          </Button>
    </div>
  );
};

export const EditMemberForm = ({ members }: { members: Member[] }) => {
  return members.map((member) => (
    <EditMemberRow key={member.id} member={member} />
  ));
};
