"use client";

import { addMember } from "@/app/actions";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { useState } from "react";

export const DeleteMemberFormDialog = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    try {
      setOpen(false);
      toast.success(`${member.name} を削除しました`);
      router.refresh();
    } catch (error) {
      toast.error("メンバーの削除に失敗しました");
      console.error("Error adding member:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Trash2 />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form action={handleSubmit} className="grid gap-5">
          <DialogHeader>
            <DialogTitle>メンバーを削除</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-2">${addMember.name} を削除しますか？</div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">キャンセル</Button>
            </DialogClose>
            <Button type="submit" variant="destructive">
              削除
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
