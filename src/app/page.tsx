export default function Home() {
  const generatePairings = <T,>(participants: T[]): T[][][] => {
    const result: T[][][] = [];

    // 奇数だった場合"お休み"を追加
    if (participants.length % 2 !== 0) {
      participants.push("お休み" as unknown as T);
    }

    const helper = (remaining: T[], pairs: T[][]): void => {
      // 2人1ペアができたらresultにpairsを追加する
      if (remaining.length === 0) {
        result.push([...pairs]);
        return;
      }

      // 残りの参加者の中で一番最初のメンバーを指定
      const first = remaining[0];

      for (let i = 1; i < remaining.length; i++) {
        // 1ペアを作成
        const pair = [first, remaining[i]];

        helper(
          // pairに追加したメンバーを除いた残りの参加者の配列
          remaining.filter((_, index) => index !== 0 && index !== i),
          [...pairs, pair]
        );
      }
    };

    helper(participants, []);
    return result;
  };

  const participants = ["a", "b", "c"];
  console.log("generatePairings", generatePairings(participants));

  return (
    <main>
      {generatePairings(participants).map((pairs) => (
        <ul className="border-b-2 border-white" key={String(pairs)}>
          {pairs.map((pair) => (
            <li key={String(pair)}>{pair}</li>
          ))}
        </ul>
      ))}
    </main>
  );
}
