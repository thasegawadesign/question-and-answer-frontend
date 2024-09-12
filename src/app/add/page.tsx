import * as Form from "@radix-ui/react-form";
import clsx from "clsx";
import Link from "next/link";

export default function Add() {
  return (
    <>
      <header className={clsx("px-5 py-4")}>
        <h1>
          <Link className={clsx("text-lg font-semibold")} href={"/"}>
            一問一答メーカー
          </Link>
        </h1>
      </header>
      <main className={clsx("px-5")}>
        <Form.Root>
          <Form.Field className={clsx("mb-3 flex gap-3")} name="question">
            <div className={clsx("grid place-items-center")}>
              <Form.Label className="question">問題</Form.Label>
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
          <Form.Field className={clsx("mb-4 flex gap-3")} name="answer">
            <div className={clsx("grid place-items-center")}>
              <Form.Label className="answer">解答</Form.Label>
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
            <div className={clsx("pl-11")}>
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
