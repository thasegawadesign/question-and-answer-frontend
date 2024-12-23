"use client";

import Header from "@/components/header";
import { addItem } from "@/utils/addItem";
import * as Form from "@radix-ui/react-form";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef } from "react";

export default function Add() {
  const { data: session } = useSession();
  const router = useRouter();
  const inputRef = useRef(null);

  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      const formData = new FormData(event.target as HTMLFormElement);
      const data = {
        question: formData.get("question"),
        answer: formData.get("answer"),
        email: session?.user?.email,
      };
      await addItem(
        data.question as string,
        data.answer as string,
        data.email as string
      );
      (event.target as HTMLFormElement).reset();
      router.push("/");
    },
    [router, session]
  );

  useEffect(() => {
    if (inputRef.current) {
      (inputRef.current as HTMLInputElement).focus();
    }
  }, []);

  return (
    <>
      <Header />
      <main className={clsx("pl-1.5 pr-3 pt-3")}>
        <Form.Root onSubmit={handleSubmit}>
          <Form.Field className={clsx("mb-2 flex gap-1")} name="question">
            <div className={clsx("grid shrink-0 place-items-start")}>
              <Form.Label className="question rounded bg-gray-800 px-3 py-2 text-white">
                問題
              </Form.Label>
            </div>
            <div className={clsx("flex-grow")}>
              <Form.Control asChild>
                <input
                  ref={inputRef}
                  className={clsx(
                    "w-full rounded border border-gray-300 px-2 py-2"
                  )}
                  type="text"
                  required
                />
              </Form.Control>
              <Form.Message
                className={clsx("text-sm text-red-600")}
                match="valueMissing"
              >
                ※問題を入力してください
              </Form.Message>
            </div>
          </Form.Field>
          <Form.Field className={clsx("mb-3 flex gap-1")} name="answer">
            <div className={clsx("grid shrink-0 place-items-start")}>
              <Form.Label className={clsx("answer px-3 py-2")}>解答</Form.Label>
            </div>
            <div className={clsx("flex-grow")}>
              <Form.Control asChild>
                <input
                  className={clsx(
                    "w-full rounded border border-gray-300 px-2 py-2"
                  )}
                  type="text"
                  required
                />
              </Form.Control>
              <Form.Message
                className={clsx("text-sm text-red-600")}
                match="valueMissing"
              >
                ※解答を入力してください
              </Form.Message>
            </div>
          </Form.Field>
          <Form.Submit asChild>
            <div className={clsx("pl-[60px]")}>
              <button
                className={clsx(
                  "w-full rounded bg-orange-500 px-8 py-3 text-white transition-colors hover:bg-orange-400"
                )}
              >
                追加する
              </button>
            </div>
          </Form.Submit>
        </Form.Root>
      </main>
    </>
  );
}
