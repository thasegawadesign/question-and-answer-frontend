import Header from "@/app/components/header";
import LoginButton from "@/app/components/loginButton";
import LogoutButton from "@/app/components/logoutButton";
import "@/app/globals.css";
import { options } from "@/app/options";
import clsx from "clsx";
import { getServerSession } from "next-auth";

export default async function Login() {
  const session = await getServerSession(options);

  return (
    <>
      <Header />
      <main className={clsx("px-3")}>
        <h1 className={clsx("mb-2 text-green-600")}>
          {session?.user?.name ? `ログイン中 ${session.user.name} さん` : ""}
        </h1>
        <div className={clsx("flex justify-between")}>
          <LoginButton />
          <LogoutButton />
        </div>
      </main>
    </>
  );
}
