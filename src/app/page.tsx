"use client";

import DeleteButton from "@/components/deleteButton";
import Header from "@/components/header";
import Loading from "@/components/loading";
import LogoutButton from "@/components/logoutButton";
import { Item } from "@/types/Item";
import { getItems } from "@/utils/getItems";
import { ChevronRightIcon } from "@heroicons/react/16/solid";
import * as Accordion from "@radix-ui/react-accordion";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleKeydown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        router.push("/add");
      }
    },
    [router]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [handleKeydown]);

  useEffect(() => {
    if (!session?.user?.email) return;
    const timer = setTimeout(async () => {
      setItems(await getItems(session?.user?.email as string));
      setIsLoading(false);
    }, 10);
    return () => clearTimeout(timer);
  }, [session]);

  return (
    <>
      <Header />
      <main className={clsx("relative px-3 pb-3 pt-3")}>
        <Accordion.Root
          type="multiple"
          className={clsx("mb-[760px] flex flex-col gap-2")}
        >
          {isLoading && <Loading />}
          {items.map((item, i) => (
            <div key={i}>
              <Accordion.Item
                value={String(item.id)}
                className={clsx("rounded-lg bg-gray-100")}
              >
                <Accordion.AccordionTrigger
                  className={clsx(
                    "group flex w-full justify-between px-4 py-4"
                  )}
                >
                  <span className={clsx("text-left text-lg")}>
                    {item.question}
                  </span>
                  <ChevronRightIcon
                    className={clsx(
                      "w-6 transition-transform group-radix-state-open:rotate-90"
                    )}
                  />
                </Accordion.AccordionTrigger>
                <Accordion.AccordionContent>
                  <div className={clsx("flex justify-between gap-2 px-4 pb-4")}>
                    <span>{item.answer}</span>
                    <DeleteButton
                      id={item.id}
                      email={session?.user?.email as string}
                    />
                  </div>
                </Accordion.AccordionContent>
              </Accordion.Item>
            </div>
          ))}
        </Accordion.Root>
        <div className={clsx("flex justify-center rounded bg-red-800 py-4")}>
          <LogoutButton />
        </div>
      </main>
    </>
  );
}
