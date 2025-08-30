"use client";

import { addMember } from "@/app/actions";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Checkbox } from "@/app/components/ui/checkbox";
import { useState } from "react";
import { toast } from "sonner";
import { Plus } from "lucide-react";

export const AddMemberFormDialog = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    try {
      const member = await addMember(formData);
      setOpen(false);
      setName("");
      toast.success(`${member.name} を追加しました`);
      router.refresh();
    } catch (error) {
      toast.error("メンバーの追加に失敗しました");
      console.error("Error adding member:", error);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) setName("");
        setOpen(open);
      }}
    >
      <DialogTrigger asChild>
        <Button>
          <Plus />
          メンバーを追加
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form action={handleSubmit} className="grid gap-5">
          <DialogHeader>
            <DialogTitle>メンバーを追加</DialogTitle>
            <DialogDescription>
              CTに追加するメンバーを入力してください
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">名前</Label>
              <Input
                name="name"
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox name="participate" id="participate" defaultChecked />
              <Label htmlFor="participate">CT参加メンバーとして追加</Label>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">キャンセル</Button>
            </DialogClose>
            <Button type="submit" disabled={!name}>
              追加
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
