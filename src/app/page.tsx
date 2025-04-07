import {
  addMonths,
  eachDayOfInterval,
  format,
  getMonth,
  getYear,
  isMonday,
} from "date-fns";
import { ja } from "date-fns/locale";

export default function Home() {
  const members = ["😺", "🐶", "🐱", "🐭", "🐹"];
  const membersWithEmpty = ["", ...members];

  const today = new Date();
  const thisMonth = getMonth(today) + 1;
  const thisYear = getYear(today);
  const mondays = eachDayOfInterval({
    start: new Date(`${thisYear}-${thisMonth}-01`),
    end: addMonths(new Date(`${thisYear}-${thisMonth}-31`), 2),
  })
    .filter((day) => isMonday(day))
    .map((date) => format(date, "yyyy年M/d(E)", { locale: ja }));

  return (
    <main className="flex gap-10 justify-center mt-10">
      <table className="border-t border-l h-full">
        <tbody>
          {membersWithEmpty.map((colMember, rowIndex) => (
            <tr key={`tr-${rowIndex}`} className="border-b">
              <th className="w-10 h-10 border-r">{colMember}</th>
              {members.map((rowMember, colIndex) =>
                rowIndex === 0 ? (
                  <th key={`cell-th-${colIndex}`} className="w-10 h-10 border-r">
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
                    {(colIndex + rowIndex - 1) % members.length}
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
            index < members.length && (
              <li key={monday}>
                <span>{index % members.length}:</span>
                <time dateTime={monday}>{monday}</time>
              </li>
            )
        )}
      </ul>
    </main>
  );
}
