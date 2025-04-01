import { addDays, eachDayOfInterval, format, isMonday } from "date-fns";
import { ja } from "date-fns/locale";

export default function Home() {
  const members = ["😺", "🐶", "🐱", "🐭", "🐹"];
  if (members.length % 2 !== 0) {
    members.push("㊡");
  }
  const membersWithEmpty = ["", ...members];

  const today = new Date();
  const later = addDays(today, 90);
  const mondays = eachDayOfInterval({
    start: today,
    end: later,
  })
    .filter((day) => isMonday(day))
    .map((date) => format(date, "yyyy年M/d(E)", { locale: ja }));
  console.log(mondays);

  return (
    <main className="grid justify-center mt-10">
      <table className="border-t border-l">
        <tbody>
          {membersWithEmpty.map((colMember, trIndex) => (
            <tr key={`col-tr-${trIndex}`} className="border-b">
              <th className="w-10 h-10 border-r">{colMember}</th>
              {members.map((rowMember, tdIndex) =>
                trIndex === 0 ? (
                  <th key={`row-th-${tdIndex}`} className="w-10 h-10 border-r">
                    {rowMember}
                  </th>
                ) : (
                  <td
                    key={`td-${tdIndex}`}
                    className={`w-10 h-10 border-r text-center ${
                      trIndex - 1 === tdIndex && "bg-gray-100"
                    }`}
                  >
                    {trIndex - 1 !== tdIndex &&
                      // trIndexはmembersWithEmptyから取得しており、要素数が1つ多いため-1をしている
                      (tdIndex + trIndex - 1) % members.length}
                  </td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
