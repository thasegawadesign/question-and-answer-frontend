import * as Accordion from "@radix-ui/react-accordion";
import Header from "./components/header";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Accordion.Root type="multiple">
          <Accordion.Item value="item-1">
            <Accordion.AccordionTrigger>Reactとは？</Accordion.AccordionTrigger>
            <Accordion.AccordionContent>
              UI構築のためのJavaScriptライブラリ。
            </Accordion.AccordionContent>
          </Accordion.Item>
          <Accordion.Item value="item-2">
            <Accordion.AccordionTrigger>
              Next.jsとは？
            </Accordion.AccordionTrigger>
            <Accordion.AccordionContent>
              Reactベースに開発されたフロントエンドフレームワーク。
            </Accordion.AccordionContent>
          </Accordion.Item>
          <Accordion.Item value="item-3">
            <Accordion.AccordionTrigger>
              REST APIとは？
            </Accordion.AccordionTrigger>
            <Accordion.AccordionContent>
              汎用性の高いWebサービスアプリケーション同士の通信を支援するAPIの1つの種類。
            </Accordion.AccordionContent>
          </Accordion.Item>
        </Accordion.Root>
      </main>
    </>
  );
}
