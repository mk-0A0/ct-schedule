"use client";

import { Member } from "@/app/actions";
import { Button } from "@/app/components/ui/button";
import { Checkbox } from "@/app/components/ui/checkbox";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { PencilLine } from "lucide-react";
import { Fragment, useState } from "react";

export const EditMemberForm = ({ members }: { members: Member[] }) => {
  const [edit, setEdit] = useState(false);

  return (
    <div>
      <Button variant="outline" onClick={() => setEdit(!edit)} size="icon">
        <PencilLine />
      </Button>
      {edit ? (
        <form action="">
          {members.map((member) => (
            <Fragment key={member.id}>
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
            </Fragment>
          ))}
        </form>
      ) : (
        members.map((member) => (
          <p key={member.id}>
            {member.name}: {String(member.participate)}
          </p>
        ))
      )}
    </div>
  );
};
