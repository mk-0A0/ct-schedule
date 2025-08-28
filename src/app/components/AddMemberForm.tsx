"use client";

export const AddMemberForm = () => {
  return (
    <form>
      <div>
        <label htmlFor="member-name">名前</label>
        <input type="text" id="member-name" />
      </div>
      <div>
        <input type="checkbox" id="member-participate" />
        <label htmlFor="member-participate">CT参加メンバーとして追加</label>
      </div>
      <button type="submit">追加</button>
    </form>
  );
};
