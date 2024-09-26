import Header from "@/app/components/header";
import LogoutButton from "@/app/components/logoutButton";
import { options } from "@/app/options";
import { getItems } from "@/app/utils/getItems";
import { ChevronRightIcon } from "@heroicons/react/16/solid";
import * as Accordion from "@radix-ui/react-accordion";
import clsx from "clsx";
import { getServerSession } from "next-auth";

type Item = {
  id: number;
  question: string;
  answer: string;
  user: {
    id: number;
    email: string;
    provider: string;
  };
  user_email: string;
};

export default async function Home() {
  const session = await getServerSession(options);
  const items: Item[] = await getItems(session?.user?.email as string);

  return (
    <>
      <Header />
      <main className={clsx("px-3")}>
        <Accordion.Root
          type="multiple"
          className={clsx("mb-[560px] flex flex-col gap-2")}
        >
          {items.map((item, i) => (
            <div key={i}>
              <Accordion.Item
                value={String(item.id)}
                className={clsx("rounded bg-gray-100")}
              >
                <Accordion.AccordionTrigger
                  className={clsx(
                    "group flex w-full justify-between px-4 py-3.5"
                  )}
                >
                  <span className={clsx("text-lg")}>{item.question}</span>
                  <ChevronRightIcon
                    className={clsx(
                      "w-6 text-orange-600 transition-transform group-radix-state-open:rotate-90"
                    )}
                  />
                </Accordion.AccordionTrigger>
                <Accordion.AccordionContent className={clsx("px-4 pb-4")}>
                  {item.answer}
                </Accordion.AccordionContent>
              </Accordion.Item>
            </div>
          ))}
        </Accordion.Root>
        <div
          className={clsx("mb-3 flex justify-center rounded bg-red-700 py-4")}
        >
          <LogoutButton />
        </div>
      </main>
    </>
  );
}
