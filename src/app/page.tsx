"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addMonths,
  eachDayOfInterval,
  format,
  getMonth,
  getYear,
  isMonday,
} from "date-fns";
import { ja } from "date-fns/locale";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Home() {
  const [members, setMembers] = useState<string[]>([
    "🐱",
    "🐶",
    "🐷",
    "🐭",
    "🐹",
  ]);
  const membersWithEmpty = ["", ...members];

  const today = new Date();
  const thisMonth = getMonth(today) + 1;
  const thisYear = getYear(today);
  const mondays = eachDayOfInterval({
    start: new Date(`${thisYear}-${thisMonth}-01`),
    end: addMonths(new Date(`${thisYear}-${thisMonth}-31`), 2),
  })
    .filter((day) => isMonday(day))
    .map((date) => format(date, "yyyy/M/d(E)", { locale: ja }));

  const formSchema = z.object({
    name: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setMembers([...members, values.name]);
    form.reset();
  };

  const deleteFormSchema = z.object({
    members: z.array(z.string()),
  });

  const deleteForm = useForm<z.infer<typeof deleteFormSchema>>({
    resolver: zodResolver(deleteFormSchema),
    defaultValues: {
      members: [],
    },
  });

  return (
    <main className="space-y-10">
      <section className="flex gap-10 justify-center mt-10">
        <table className="border-t border-l h-full">
          <tbody>
            {membersWithEmpty.map((colMember, rowIndex) => (
              <tr key={`tr-${rowIndex}`} className="border-b">
                <th className="w-10 h-10 border-r">{colMember}</th>
                {members.map((rowMember, colIndex) =>
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
      </section>
      <section className="max-w-md mx-auto">
        <Form {...form}>
          <form
            onSubmit={
              form.getValues().name !== ""
                ? form.handleSubmit(onSubmit)
                : undefined
            }
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>名前</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={!form.getValues().name}
              className="w-full"
            >
              追加
            </Button>
          </form>
        </Form>
      </section>
      <hr />
      <section className="max-w-md mx-auto">
        <Form>
          <form onSubmit={} className="space-y-4">
            <FormField
              control={}
              name="members"
              render={() => (
                <FormItem>
                  {members.map((member) => (
                    <FormField
                      key={member}
                      control={}
                      name="members"
                      render={() => (
                        <FormItem className="space-x-2 space-y-0">
                          <FormControl>
                            <Checkbox />
                          </FormControl>
                          <FormLabel>{member}</FormLabel>
                        </FormItem>
                      )}
                    />
                  ))}
                </FormItem>
              )}
            />
        <Button type="submit" variant="destructive" className="w-full">
          メンバーを削除
        </Button>
          </form>
        </Form>
      </section>
    </main>
  );
}
