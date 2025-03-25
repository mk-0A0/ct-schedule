export default function Home() {
  const members = ["😺", "🐶", "🐱", "🐭", "🐹"];

  return (
    <main>
      <table>
        <tbody>
          <tr className="border-b">
            <th className="border-r"></th>
            {members.map((member, index) => (
              <th key={`row-th-${index}`} className="w-10 h-10 border-r">
                {member}
              </th>
            ))}
          </tr>
          {members.map((member, index) => (
            <tr key={`col-tr-${index}`} className="border-b">
              <th className="w-10 h-10 border-r">{member}</th>
              {members.map((_, index) => (
                <td key={`td-${index}`} className="w-10 h-10 border-r"></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
