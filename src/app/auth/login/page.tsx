import "@/app/globals.css";
import { options } from "@/app/options";
import Header from "@/components/header";
import LoginButton from "@/components/loginButton";
import LogoutButton from "@/components/logoutButton";
import { createUser } from "@/utils/createUser";
import { getUser } from "@/utils/getUser";
import clsx from "clsx";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Login() {
  const session = await getServerSession(options);
  const user = await getUser(session?.user?.email as string);
  const isLogin = Boolean(session?.user?.email);
  if (!user) {
    await createUser(session?.user?.email as string, "Google");
  }
  if (isLogin) {
    redirect("/");
  }

  return (
    <>
      <Header />
      <main className={clsx("px-3")}>
        <h1 className={clsx("mb-2 text-green-600")}>
          {session?.user?.name ? `ログイン中 ${session.user.name} さん` : ""}
        </h1>
        <div className={clsx("flex justify-between")}>
          {!user && <LoginButton />}
          {isLogin && <LogoutButton />}
        </div>
      </main>
    </>
  );
}
