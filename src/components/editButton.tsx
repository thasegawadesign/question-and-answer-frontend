import { editAtom } from "@/app/atoms/editAtom";
import { PencilSquareIcon } from "@heroicons/react/16/solid";
import clsx from "clsx";
import { useAtom } from "jotai";
import { MutableRefObject, useCallback } from "react";

type Props = {
  editableRefs: MutableRefObject<(HTMLInputElement | null)[]>;
  index: number;
};

export default function EditButton(props: Props) {
  const { editableRefs, index } = props;

  const [, setIsEditing] = useAtom(editAtom);

  const handleClick = useCallback(() => {
    setIsEditing((prev) => !prev);
    editableRefs.current[index]?.focus();
  }, [editableRefs, index, setIsEditing]);

  return (
    <>
      <button aria-label="編集する" onClick={() => handleClick()}>
        <PencilSquareIcon
          className={clsx(
            "w-6 text-gray-600 transition-colors hover:text-gray-500"
          )}
        />
      </button>
    </>
  );
}
