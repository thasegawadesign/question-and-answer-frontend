"use client";

import DeleteButton from "@/components/deleteButton";
import EditButton from "@/components/editButton";
import Header from "@/components/header";
import Loading from "@/components/loading";
import LogoutButton from "@/components/logoutButton";
import { Item } from "@/types/Item";
import { getItems } from "@/utils/getItems";
import { updateItem } from "@/utils/updateItem";
import { CheckIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import * as Accordion from "@radix-ui/react-accordion";
import clsx from "clsx";
import { useAtom } from "jotai";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { editAtom } from "./atoms/editAtom";

export default function Home() {
  const { data: session } = useSession();

  const router = useRouter();

  const editableRef = useRef<HTMLInputElement>(null);

  const [isEditing, setIsEditing] = useAtom(editAtom);
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

  const handleChange = useCallback(
    (id: number, event: ChangeEvent) => {
      const updateItems = items.map((item) =>
        item.id === id
          ? { ...item, answer: (event.target as HTMLInputElement).value }
          : item
      );
      setItems(updateItems);
    },
    [items]
  );

  const handleBlur = useCallback(
    async (id: number, email: string, question: string, answer: string) => {
      setIsEditing(false);
      await updateItem(id, email, question, answer);
    },
    [setIsEditing]
  );

  const handleClick = useCallback(
    async (id: number, email: string, question: string, answer: string) => {
      setIsEditing(false);
      await updateItem(id, email, question, answer);
    },
    [setIsEditing]
  );

  useEffect(() => {
    const input = editableRef.current;
    if (!input) return;
    if (isEditing) {
      input.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [handleKeydown]);

  useEffect(() => {
    if (!session?.user?.email) return;
    const timer = setTimeout(async () => {
      const items = await getItems(session?.user?.email as string);
      setItems(items);
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
          className={clsx("mb-[calc(100vh-160px)] flex flex-col gap-2")}
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
                    <input
                      ref={editableRef}
                      className={clsx("w-full bg-gray-100 px-1.5 py-1")}
                      value={item.answer}
                      onFocus={() => setIsEditing(true)}
                      onChange={(event) => handleChange(item.id, event)}
                      onBlur={() =>
                        handleBlur(
                          item.id,
                          session?.user?.email as string,
                          item.question,
                          item.answer
                        )
                      }
                    />
                    <div className={clsx("flex gap-1")}>
                      {isEditing ? (
                        <button
                          aria-label="決定する"
                          onClick={() =>
                            handleClick(
                              item.id,
                              session?.user?.email as string,
                              item.question,
                              item.answer
                            )
                          }
                        >
                          <CheckIcon
                            className={clsx(
                              "w-6 text-green-600 hover:text-green-500"
                            )}
                          />
                        </button>
                      ) : (
                        <EditButton />
                      )}
                      <DeleteButton
                        id={item.id}
                        email={session?.user?.email as string}
                      />
                    </div>
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
