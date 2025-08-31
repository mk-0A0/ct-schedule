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

export const EditMemberForm = ({ member }: { member: Member }) => {
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
    <form action={handleSubmit} key={member.id} className="grid gap-3">
      <Input type="hidden" name="id" value={member.id} />
      <div className="flex gap-3 items-center">
        <Input
          name="name"
          id="name"
          defaultValue={member.name}
          className="w-[300px]"
        />
        <div className="flex items-center gap-2">
          <Checkbox
            name="participate"
            id="participate"
            defaultChecked={member.participate}
          />
          <Label htmlFor="participate">CTに参加する</Label>
        </div>
      </div>
      <div className="flex gap-2">
        <Button onClick={() => setEdit(false)} variant="outline">
          キャンセル
        </Button>
        <Button type="submit">保存</Button>
      </div>
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
