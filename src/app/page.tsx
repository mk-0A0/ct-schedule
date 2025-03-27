export default function Home() {
  const members = ["😺", "🐶", "🐱", "🐭", "🐹"];
  const membersWithEmpty = ["", ...members];

  return (
    <main>
      <table>
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
                    {/* trIndexはmembersWithEmptyから取得しており、要素数が1つ多いため-1をしている */}
                    {(tdIndex + (trIndex - 1)) % members.length}
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
