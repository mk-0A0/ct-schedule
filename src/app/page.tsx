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
                  <td key={`td-${tdIndex}`} className="w-10 h-10 border-r"></td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
