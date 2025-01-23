import Image from "next/image";

export default function Home() {
  const getCombinations = <T,>(array: T[], size: number): T[][] => {
    // arrayが奇数の場合はnullを追加
    if (array.length % 2 !== 0) {
      array.push(null as unknown as T);
    }

    const result: T[][] = [];

    // 再帰関数
    const helper = (tempArray: T[], start: number): void => {
      // tempArrayの要素数がsizeになったら現在の組み合わせをresultに追加 e.g.)[1,2]
      if (tempArray.length === size) {
        result.push([...tempArray]);
        return;
      }

      for (let i = start; i < array.length; i++) {
        tempArray.push(array[i]); // tempArrayにarrayのi番目の要素を追加 e.g.)[1]
        helper(tempArray, i + 1); // ↑で作成したtempArrayを再帰関数に渡す。startはarrayのi+1番目から
        tempArray.pop(); // バックトラック（計算のリセット）
      }
    };

    // 再帰関数の初期化（デフォルト値）
    // 空配列の0番目から処理を開始
    helper([], 0);

    return result;
  };
  const array = [1, 2, 3, 4];
  console.log(getCombinations(array, 2));

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <table>
        <tr className="border-b">
          <th className="border-r"></th>
          {array.map((item, index) => (
            <th key={`row-th-${index}`} className="w-10 h-10 border-r">
              {item}
            </th>
          ))}
        </tr>
        {array.map((item, index) => (
          <tr key={`col-tr-${index}`} className="border-b">
            <th className="w-10 h-10 border-r">{item}</th>
            {array.map((_, index) => (
              <td key={`td-${index}`} className="w-10 h-10 border-r"></td>
            ))}
          </tr>
        ))}
      </table>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              src/app/page.tsx
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
