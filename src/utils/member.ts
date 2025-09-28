import { Member } from "@/app/actions";

export type Pair = [Member, Member | null];
export type Round = Pair[];

// ペアの生成
export function generateRoundRobinPairs(memberData: Member[]) {
  // 不参加のメンバーを除外
  const participants = memberData.filter((member) => member.participate);
  if (participants.length < 2) {
    return [];
  }

  const rounds: Round[] = [];
  const isEven = participants.length % 2 === 0;
  const members = isEven ? [...participants] : [...participants, null]; // 参加者が奇数の場合はnull（お休み）を追加
  const totalMembers = members.length;
  //   console.log("Total Members:", members);

  // 1回分のペアを作成
  for (let round = 0; round < totalMembers - 1; round++) {
    const roundPairs: Pair[] = [];
    // 二人一組のペアを作成
    for (let i = 0; i < totalMembers / 2; i++) {
      const member1Index = i;
      const member2Index = totalMembers - 1 - i; // ペアになる人を後ろから取得
      console.log("Pair Indices:", member1Index, member2Index);
      const member1 = members[member1Index];
      const member2 = members[member2Index];

      if (member1) {
        roundPairs.push([member1, member2]);
      }
    }
    rounds.push(roundPairs);

    
    const temp = members[1];
    for (let i = 1; i < totalMembers - 1; i++) {
      members[i] = members[i + 1];
    }
    members[totalMembers - 1] = temp;
  }
  return rounds;
}
