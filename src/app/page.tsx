import { getMember } from "@/app/actions";
import { Member } from "@/app/api/route";
import { AddMemberForm } from "@/app/components/AddMemberForm";
import {
  eachDayOfInterval,
  format,
  isBefore,
  isMonday,
  startOfDay,
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

const MemberCell = ({ name }: { name: string }) => {
  return (
    <th className="border-r text-sm p-1 font-normal bg-gray-100">
      <div className="w-[100px]">
        <span className="block text-xs text-gray-700 leading-none font-bold">
          {name}
        </span>
      </div>
    </th>
  );
};

export default async function Home() {
  const memberData: { members: Member[] } = await getMemberData();

  const mondays = eachDayOfInterval({
    start: new Date("2025-08-01"),
    end: new Date("2026-12-31"),
  })
    .filter((day) => isMonday(day))
    .map((date) => format(date, "yyyy/M/d(E)", { locale: ja }));

  const memberDataNew = await getMember();

  return (
    <main className="max-w-7xl mx-auto p-10">
      {memberDataNew.map((member) => (
        <div key={member.id}>
          <span>{member.id} </span>
          <span>{member.name}: </span>
          <span>{String(member.participate)}</span>
        </div>
      ))}
      <AddMemberForm />
      <div className="grid gap-5">
        <h1 className="text-2xl font-bold">CT組み合わせ表</h1>
        <section>
          <p>現在の参加者：{memberData.members.length}人</p>
          <p className="mt-4 text-sm">グレーアウトしたマスの扱いについて</p>
          <p className="text-gray-500 text-sm">
            ・参加人数が奇数： グレーアウトしたマスはお休み
          </p>
          <p className="text-gray-500 text-sm">
            ・参加人数が偶数：
            自分がグレーアウトしたマスの場合、同じくグレーかつ数字が同じメンバーとペアになる
          </p>
        </section>
      </div>
      <article className="flex gap-5 mt-10">
        <aside>
          <ol>
            {mondays.map(
              (monday, index) =>
                index < memberData.members.length && (
                  <li
                    key={monday}
                    className={
                      // mondayが今日以前であればグレーアウト
                      isBefore(monday, startOfDay(new Date()))
                        ? "bg-gray-300"
                        : ""
                    }
                  >
                    <span>{index % memberData.members.length}:</span>
                    <time dateTime={monday}>{monday}</time>
                  </li>
                )
            )}
          </ol>
        </aside>
        <table className="border-t border-l h-full">
          <tbody>
            {/* "": 左上の空マス */}
            {[{ name: "" }, ...memberData.members].map(
              (colMember, rowIndex) => (
                <tr key={`tr-${rowIndex}`} className="border-b">
                  <MemberCell name={colMember.name} />
                  {memberData.members.map((rowMember, colIndex) =>
                    rowIndex === 0 ? (
                      <MemberCell
                        name={rowMember.name}
                        key={`cell-th-${colIndex}`}
                      />
                    ) : (
                      <td
                        key={`cell-${colIndex}`}
                        className={`border-r text-center text-gray-500 ${
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
      </article>
    </main>
  );
}
