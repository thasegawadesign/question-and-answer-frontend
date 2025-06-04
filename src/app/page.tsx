"use client";

import DeleteButton from "@/components/deleteButton";
import EditButton from "@/components/editButton";
import Header from "@/components/header";
import Loading from "@/components/loading";
import LogoutButton from "@/components/logoutButton";
import { Item } from "@/types/Item";
import { getItems } from "@/utils/getItems";
import { updateItem } from "@/utils/updateItem";
import { CheckCircleIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
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

  const editableRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [isEditing, setIsEditing] = useAtom(editAtom);
  const [items, setItems] = useState<Item[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleKeydown = useCallback(
    (event: KeyboardEvent) => {
      if (isEditing) return;
      if (event.key === "Enter") {
        router.push("/add");
      }
    },
    [isEditing, router]
  );

  const handleChange = useCallback(
    (id: number, event: ChangeEvent) => {
      const updatedItems = items.map((item) =>
        item.id === id
          ? { ...item, answer: (event.target as HTMLInputElement).value }
          : item
      );
      setItems(updatedItems);
    },
    [items]
  );

  const handleFocus = useCallback(
    (i: number) => {
      setIsEditing(true);
      setFocusedIndex(i);
    },
    [setIsEditing]
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
        {items.length === 0 && !isLoading && (
          <div className={clsx("py-[35vh] text-center text-gray-500")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={clsx("mx-auto mb-5 size-12")}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"
              />
            </svg>
            <p className={clsx("mb-1 text-lg font-bold")}>アイテムは空です</p>
            <p>右上のボタンからアイテムを追加できます</p>
          </div>
        )}
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
                      ref={(element) => {
                        editableRefs.current[i] = element;
                      }}
                      className={clsx("w-full bg-gray-100 px-2.5 py-1.5")}
                      value={item.answer}
                      onFocus={() => handleFocus(i)}
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
                    <div className={clsx("flex gap-1.5")}>
                      {isEditing && focusedIndex === i ? (
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
                          <CheckCircleIcon
                            className={clsx(
                              "w-6 text-green-600 transition-colors hover:text-green-500"
                            )}
                          />
                        </button>
                      ) : (
                        <EditButton editableRefs={editableRefs} index={i} />
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
