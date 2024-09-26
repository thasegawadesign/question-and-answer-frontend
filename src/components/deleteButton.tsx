"use client";

import { deleteItem } from "@/utils/deleteItem";
import { TrashIcon } from "@heroicons/react/16/solid";
import clsx from "clsx";
import { useRouter } from "next/navigation";

type Props = {
  id: number;
  email: string;
};

export default function DeleteButton(props: Props) {
  const { id, email } = props;
  const router = useRouter();
  const handleClick = async (id: number, email: string) => {
    await deleteItem(id, email);
    router.refresh();
  };
  return (
    <>
      <button onClick={() => handleClick(id, email)}>
        <TrashIcon className={clsx("w-6 text-red-600")} />
      </button>
    </>
  );
}
