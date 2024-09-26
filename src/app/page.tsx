import Header from "@/app/components/header";
import LogoutButton from "@/app/components/logoutButton";
import { options } from "@/app/options";
import { ChevronRightIcon } from "@heroicons/react/16/solid";
import * as Accordion from "@radix-ui/react-accordion";
import clsx from "clsx";
import { getServerSession } from "next-auth";
import { getItems } from "./utils/getItems";

export default async function Home() {
  const session = await getServerSession(options);
  const items: [] = await getItems(session?.user?.email as string);
  console.log(items);

  return (
    <>
      <Header />
      <main className={clsx("px-3")}>
        <Accordion.Root
          type="multiple"
          className={clsx("mb-[560px] flex flex-col gap-2")}
        >
          <Accordion.Item
            value="item-1"
            className={clsx("rounded bg-gray-100")}
          >
            <Accordion.AccordionTrigger
              className={clsx("group flex w-full justify-between px-4 py-3.5")}
            >
              <span className={clsx("text-lg")}>Reactとは？</span>
              <ChevronRightIcon
                className={clsx(
                  "w-6 text-orange-600 transition-transform group-radix-state-open:rotate-90"
                )}
              />
            </Accordion.AccordionTrigger>
            <Accordion.AccordionContent className={clsx("px-4 pb-4")}>
              UI構築のためのJavaScriptライブラリ。
            </Accordion.AccordionContent>
          </Accordion.Item>
          <Accordion.Item
            value="item-2"
            className={clsx("rounded bg-gray-100")}
          >
            <Accordion.AccordionTrigger
              className={clsx("group flex w-full justify-between px-4 py-3.5")}
            >
              <span className={clsx("text-lg")}>Next.jsとは？</span>
              <ChevronRightIcon
                className={clsx(
                  "w-6 text-orange-600 transition-transform group-radix-state-open:rotate-90"
                )}
              />
            </Accordion.AccordionTrigger>
            <Accordion.AccordionContent className={clsx("px-4 pb-4")}>
              Reactベースに開発されたフロントエンドフレームワーク。
            </Accordion.AccordionContent>
          </Accordion.Item>
          <Accordion.Item
            value="item-3"
            className={clsx("rounded bg-gray-100")}
          >
            <Accordion.AccordionTrigger
              className={clsx("group flex w-full justify-between px-4 py-3.5")}
            >
              <span className={clsx("text-lg")}>REST APIとは？</span>
              <ChevronRightIcon
                className={clsx(
                  "w-6 text-orange-600 transition-transform group-radix-state-open:rotate-90"
                )}
              />
            </Accordion.AccordionTrigger>
            <Accordion.AccordionContent className={clsx("px-4 pb-4")}>
              汎用性の高いWebサービスアプリケーション同士の通信を支援するAPIの1つの種類。
            </Accordion.AccordionContent>
          </Accordion.Item>
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
