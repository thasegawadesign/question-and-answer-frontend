import { PlusCircleIcon } from "@heroicons/react/16/solid";
import clsx from "clsx";
import { M_PLUS_Rounded_1c } from "next/font/google";
import Link from "next/link";

const mPlusRounded1c = M_PLUS_Rounded_1c({
  weight: "400",
  subsets: ["latin"],
});

export default function Header() {
  return (
    <>
      <header
        className={clsx(
          "sticky top-0 z-50 flex items-center justify-between bg-gray-800 px-3 py-3.5 sm:px-5"
        )}
      >
        <h1>
          <Link
            className={clsx(`${mPlusRounded1c.className} text-xl text-white`)}
            href={"/"}
          >
            一問一答メーカー
          </Link>
        </h1>
        <p>
          <Link href={"/add"}>
            <PlusCircleIcon className="w-9 text-orange-500 transition-colors hover:text-orange-400" />
          </Link>
        </p>
      </header>
    </>
  );
}
