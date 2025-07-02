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
  const baseUrl =
    process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL ||
    "https://ct-schedule.vercel.app/";
  const data = await fetch(`${baseUrl}/api`);
  return data.json();
}

export default async function Home() {
  console.log(process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL);

  const memberData = await getMemberData();

  const membersWithEmpty = ["", ...memberData.members];

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
    <main className="flex gap-10 justify-center mt-10">
      <table className="border-t border-l h-full">
        <tbody>
          {membersWithEmpty.map((colMember, rowIndex) => (
            <tr key={`tr-${rowIndex}`} className="border-b">
              <th className="w-10 h-10 border-r">{colMember}</th>
              {memberData.members.map((rowMember: string, colIndex: number) =>
                rowIndex === 0 ? (
                  <th
                    key={`cell-th-${colIndex}`}
                    className="w-10 h-10 border-r"
                  >
                    {rowMember}
                  </th>
                ) : (
                  <td
                    key={`cell-${colIndex}`}
                    className={`w-10 h-10 border-r text-center ${
                      rowIndex - 1 === colIndex && "bg-gray-100"
                    }`}
                  >
                    {/* rowIndexはmembersWithEmptyから取得しており、要素数が1つ多いため-1をしている */}
                    {(colIndex + rowIndex - 1) % memberData.members.length}
                  </td>
                )
              )}
            </tr>
          ))}
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
    </main>
  );
}
