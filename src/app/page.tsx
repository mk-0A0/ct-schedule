import { auth, signIn, signOut } from "@/auth";
import { getMember } from "@/app/actions";
import { AddMemberFormDialog } from "@/components/AddMemberFormDialog";
import {
  eachDayOfInterval,
  format,
  isBefore,
  isMonday,
  startOfDay,
} from "date-fns";
import { ja } from "date-fns/locale";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Slack } from "lucide-react";

const MemberCell = ({ name, row }: { name: string; row?: boolean }) => {
  return (
    <th
      className={`border-r text-sm p-1 font-normal bg-gray-100 ${
        row && "sticky top-0 left-0"
      }`}
    >
      <div className="w-[100px]">
        <span className="block text-xs text-gray-700 leading-none font-bold break-words">
          {name}
        </span>
      </div>
    </th>
  );
};

export default async function Home() {
  const session = await auth();

  const mondays = eachDayOfInterval({
    start: new Date("2025-08-01"),
    end: new Date("2026-12-31"),
  })
    .filter((day) => isMonday(day))
    .map((date) => format(date, "yyyy/M/d(E)", { locale: ja }));

  const memberData = await getMember();

  // 不参加のメンバーを除外
  const member = memberData.filter((member) => member.participate);

  return (
    <main className="max-w-7xl mx-auto p-10">
      <div className="grid gap-5">
        <div className="flex justify-between items-center gap-10">
          <h1 className="text-2xl font-bold">CT組み合わせ表</h1>
          {session && session.user ? (
            <div className="flex items-center gap-4">
              <AddMemberFormDialog />
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <img
                    src={session.user.image || ""}
                    alt={`${session.user.name}のアイコン画像`}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <form
                      action={async () => {
                        "use server";
                        await signOut();
                      }}
                    >
                      <button type="submit">ログアウト</button>
                    </form>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("slack", { callbackUrl: "/" });
              }}
            >
              <Button type="submit">
                <Slack />
                Signin with Slack
              </Button>
            </form>
          )}
        </div>
        <section>
          <p>
            現在の参加者：
            <Link href="/member" className="underline">
              {member.length}人
            </Link>
          </p>
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
                index < member.length && (
                  <li
                    key={monday}
                    className={
                      // mondayが今日以前であればグレーアウト
                      isBefore(monday, startOfDay(new Date()))
                        ? "bg-gray-300"
                        : ""
                    }
                  >
                    <span>{index % member.length}:</span>
                    <time dateTime={monday}>{monday}</time>
                  </li>
                )
            )}
          </ol>
        </aside>
        <div className="border-t border-l overflow-scroll">
          <table className="h-full">
            <tbody>
              {/* "": 左上の空マス */}
              {[{ name: "" }, ...member].map((colMember, rowIndex) => (
                <tr key={`tr-${rowIndex}`} className="border-b">
                  <MemberCell name={colMember.name} row />
                  {member.map((rowMember, colIndex) =>
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
                        {(colIndex + rowIndex - 1) % member.length}
                      </td>
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    </main>
  );
}
