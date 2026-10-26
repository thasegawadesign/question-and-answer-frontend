import "@/app/globals.css";
import { options } from "@/app/options";
import Header from "@/components/header";
import LoginButton from "@/components/loginButton";
import { getUser } from "@/utils/getUser";
import { registerUser } from "@/utils/registerUser";
import clsx from "clsx";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Login() {
  const session = await getServerSession(options);
  const email = session?.user?.email;
  if (email) {
    const user = await getUser(email);
    if (!user) {
      await registerUser(email, "Google");
    }
    redirect("/");
  }

  return (
    <>
      <Header />
      <main className={clsx("px-3 pt-3")}>
        <div className={clsx("flex justify-between")}>
          <LoginButton />
        </div>
      </main>
    </>
  );
}
