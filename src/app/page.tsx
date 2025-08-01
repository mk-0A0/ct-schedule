import { Member } from "@/app/api/route";
import {
  addMonths,
  eachDayOfInterval,
  format,
  getMonth,
  getYear,
  isMonday,
} from "date-fns";
import { ja } from "date-fns/locale";

async function getMemberData() {
  function getBaseUrl() {
    if (process.env.NODE_ENV === "development") {
      return "http://localhost:3000";
    }
    if (process.env.VERCEL_ENV === "preview") {
      return `https://${process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL}`;
    }
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL!}`;
  }

  const data = await fetch(`${getBaseUrl()}/api`, {
    cache: "no-store",
    headers: {
      "x-vercel-protection-bypass": `${process.env.VERCEL_AUTOMATION_BYPASS_SECRET}`,
    },
  });

  return data.json();
}

export default async function Home() {
  const memberData: { members: Member[] } = await getMemberData();

  const today = new Date();
  const thisMonth = getMonth(today) + 1;
  const thisYear = getYear(today);
  const mondays = eachDayOfInterval({
    start: new Date(`${thisYear}-${thisMonth}-01`),
    end: addMonths(new Date(`${thisYear}-${thisMonth}-31`), 2),
  })
    .filter((day) => isMonday(day))
    .map((date) => format(date, "yyyy/M/d(E)", { locale: ja }));

  return (
    <main className="max-w-7xl mx-auto p-10">
      <p>現在の参加者：{memberData.members.length}人</p>
      <p className="text-gray-500 text-sm">
        ・参加人数が奇数： グレーアウトしたマスがお休み
      </p>
      <p className="text-gray-500 text-sm">
        ・参加人数が偶数： 自分と数字・背景色が同じマスのメンバーとペアになる
      </p>
      <article className="flex gap-10 mt-10">
        <table className="border-t border-l h-full">
          <tbody>
            {/* "": 左上の空マス */}
            {[{ name: "" }, ...memberData.members].map(
              (colMember, rowIndex) => (
                <tr key={`tr-${rowIndex}`} className="border-b">
                  <th className="w-10 h-10 border-r">{colMember.name}</th>
                  {memberData.members.map((rowMember, colIndex) =>
                    rowIndex === 0 ? (
                      <th
                        key={`cell-th-${colIndex}`}
                        className="w-10 h-10 border-r"
                      >
                        {rowMember.name}
                      </th>
                    ) : (
                      <td
                        key={`cell-${colIndex}`}
                        className={`w-10 h-10 border-r text-center ${
                          rowIndex - 1 === colIndex && "bg-gray-100"
                        }`}
                      >
                        {/* rowIndexは空マス分要素数が1つ多いため-1をしている */}
                        {(colIndex + rowIndex - 1) % memberData.members.length}
                      </td>
                    )
                  )}
                </tr>
              )
            )}
          </tbody>
        </table>
        <ul>
          {mondays.map(
            (monday, index) =>
              index < memberData.members.length && (
                <li key={monday}>
                  <span>{index % memberData.members.length}:</span>
                  <time dateTime={monday}>{monday}</time>
                </li>
              )
          )}
        </ul>
      </article>
    </main>
  );
}
