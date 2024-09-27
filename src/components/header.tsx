import { CheckBadgeIcon, PlusCircleIcon } from "@heroicons/react/16/solid";
import clsx from "clsx";
import Link from "next/link";

export default function Header() {
  return (
    <>
      <header
        className={clsx(
          "sticky top-0 z-50 mb-5 flex justify-between bg-gray-800 px-3 py-3"
        )}
      >
        <h1>
          <Link className={clsx("flex gap-1 text-lg text-white")} href={"/"}>
            <CheckBadgeIcon className="w-5" />
            一問一答メーカー
          </Link>
        </h1>
        <p>
          <Link href={"/add"}>
            <PlusCircleIcon className="w-8 text-orange-500" />
          </Link>
        </p>
      </header>
    </>
  );
}
