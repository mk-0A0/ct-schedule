"use client";

import { addMember } from "@/app/actions";

export const AddMemberForm = () => {
  const handleSubmit = async (formData: FormData) => {
    try {
      const member = await addMember(formData);
      alert(`${member.name} を追加しました`);
    } catch (error) {
      alert("失敗しました");
      console.error("Error adding member:", error);
    }
  };

  return (
    <form action={handleSubmit}>
      <div>
        <label htmlFor="name">名前</label>
        <input name="name" type="text" id="name" required />
      </div>
      <div>
        <input
          name="participate"
          type="checkbox"
          id="participate"
          defaultChecked
        />
        <label htmlFor="participate">CT参加メンバーとして追加</label>
      </div>
      <button type="submit">追加</button>
    </form>
  );
};
