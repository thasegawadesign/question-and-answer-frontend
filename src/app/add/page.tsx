"use client";

import Header from "@/app/components/header";
import { addItem } from "@/app/utils/addItem";
import * as Form from "@radix-ui/react-form";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

export default function Add() {
  const { data: session } = useSession();
  const router = useRouter();
  const handleSubmit = async (event: React.FormEvent) => {
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
  };

  return (
    <>
      <Header />
      <main className={clsx("pl-1.5 pr-3")}>
        <Form.Root onSubmit={handleSubmit}>
          <Form.Field className={clsx("mb-2 flex gap-1")} name="question">
            <div className={clsx("grid place-items-center")}>
              <Form.Label className="question rounded bg-gray-800 px-3 py-2 text-white">
                問題
              </Form.Label>
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
                ※問題を入力してください
              </Form.Message>
            </div>
          </Form.Field>
          <Form.Field className={clsx("mb-4 flex gap-1")} name="answer">
            <div className={clsx("grid place-items-center")}>
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
                className={clsx("rounded bg-orange-500 px-10 py-2 text-white")}
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
