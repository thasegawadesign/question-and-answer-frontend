"use client";

import clsx from "clsx";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <>
      <button
        onClick={() => signOut()}
        className={clsx(
          "flex items-center gap-1 rounded bg-red-600 px-6 py-2.5 text-white"
        )}
      >
        <div className={clsx("block flex-shrink-0 text-sm")}>ログアウト</div>
      </button>
    </>
  );
}
