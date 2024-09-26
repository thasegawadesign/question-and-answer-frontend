"use client";

import { deleteItem } from "@/utils/deleteItem";
import { TrashIcon } from "@heroicons/react/16/solid";
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
      <button onClick={() => handleClick(id, email)}>
        <TrashIcon className={clsx("w-5 text-red-600")} />
      </button>
    </>
  );
}
