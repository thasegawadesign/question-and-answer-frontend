"use client";

import { deleteItem } from "@/utils/deleteItem";
import { TrashIcon } from "@heroicons/react/16/solid";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import clsx from "clsx";

type Props = {
  id: number;
  email: string;
};

export default function DeleteButton(props: Props) {
  const { id, email } = props;
  const handleClick = async (id: number, email: string) => {
    await deleteItem(id, email);
    window.location.reload();
  };
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger asChild>
          <TrashIcon className={clsx("w-5 text-red-600")} />
        </AlertDialog.Trigger>
        <AlertDialog.Portal>
          <AlertDialog.Overlay
            className={clsx(
              "fixed inset-0 z-50 animate-overlayShow bg-black/90"
            )}
          />
          <AlertDialog.Content
            className={clsx(
              "fixed left-[50%] top-[50%] z-50 max-h-[85vh] w-[90vw] max-w-lg -translate-x-1/2 -translate-y-1/2 animate-contentShow rounded-md bg-white p-6 shadow-black focus:outline-none"
            )}
          >
            <AlertDialog.Title className={clsx("m-0 mb-1 text-gray-300")}>
              本当に削除しますか？
            </AlertDialog.Title>
            <AlertDialog.Description className={clsx("mb-5 text-gray-500")}>
              この操作は取り消すことができません。
            </AlertDialog.Description>
            <div className={clsx("flex justify-end gap-6")}>
              <AlertDialog.Cancel asChild>
                <button className={clsx("text-gray-300")}>キャンセル</button>
              </AlertDialog.Cancel>
              <AlertDialog.Action asChild>
                <button
                  className={clsx("rounded bg-red-600 px-6 py-2 text-white")}
                  onClick={() => handleClick(id, email)}
                >
                  削除する
                </button>
              </AlertDialog.Action>
            </div>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    </>
  );
}
