import { editAtom } from "@/app/atoms/editAtom";
import { PencilSquareIcon } from "@heroicons/react/16/solid";
import clsx from "clsx";
import { useAtom } from "jotai";

export default function EditButton() {
  const [, setIsEditing] = useAtom(editAtom);

  return (
    <>
      <button
        aria-label="編集する"
        onClick={() => setIsEditing((prev) => !prev)}
      >
        <PencilSquareIcon
          className={clsx(
            "w-6 text-red-600 transition-colors hover:text-red-500"
          )}
        />
      </button>
    </>
  );
}
