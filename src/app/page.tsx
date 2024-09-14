import { ChevronRightIcon } from "@heroicons/react/16/solid";
import * as Accordion from "@radix-ui/react-accordion";
import clsx from "clsx";
import Header from "./components/header";

export default function Home() {
  return (
    <>
      <Header />
      <main className={clsx("px-3")}>
        <Accordion.Root type="multiple" className={clsx("flex flex-col gap-2")}>
          <Accordion.Item
            value="item-1"
            className={clsx("rounded bg-gray-100")}
          >
            <Accordion.AccordionTrigger
              className={clsx(
                "group flex w-full justify-between px-4 py-4 font-semibold"
              )}
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
              className={clsx(
                "group flex w-full justify-between px-4 py-4 font-semibold"
              )}
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
              className={clsx(
                "group flex w-full justify-between px-4 py-4 font-semibold"
              )}
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
      </main>
    </>
  );
}
