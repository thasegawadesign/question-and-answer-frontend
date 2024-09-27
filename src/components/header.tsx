import { CheckBadgeIcon, PlusCircleIcon } from "@heroicons/react/16/solid";
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
          "sticky top-0 z-50 mb-5 flex justify-between bg-gray-800 px-3 py-3"
        )}
      >
        <h1>
          <Link
            className={clsx(
              `${mPlusRounded1c.className} flex gap-1 text-lg text-white`
            )}
            href={"/"}
          >
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
