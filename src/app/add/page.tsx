import * as Form from "@radix-ui/react-form";
import clsx from "clsx";
import Header from "../components/header";

export default function Add() {
  return (
    <>
      <Header />
      <main className={clsx("pl-1.5 pr-3")}>
        <Form.Root>
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
