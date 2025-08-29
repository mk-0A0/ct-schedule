"use client";

export const AddMemberForm = () => {
  return (
    <form>
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
